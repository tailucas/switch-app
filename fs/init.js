load('api_config.js');
load('api_adc.js');
load('api_gpio.js');
load('api_mqtt.js');
load('api_sys.js');
load('api_timer.js');

let debug = Cfg.get('app.debug');
if (debug) {
  print('DEBUG MODE ENABLED');
}

let led_pin = 2;
GPIO.set_mode(led_pin, GPIO.MODE_OUTPUT);

let switch1_pin = Cfg.get('app.switch_1.pin');
let switch2_pin = Cfg.get('app.switch_2.pin');

// pull GPIO low before setting output mode
let switch1_value = 1;
GPIO.write(switch1_pin, switch1_value);
let switch2_value = 1;
GPIO.write(switch2_pin, switch2_value);

GPIO.set_mode(switch1_pin, GPIO.MODE_OUTPUT);
GPIO.set_mode(switch2_pin, GPIO.MODE_OUTPUT);

let device_id = Cfg.get('device.id');
let mqtt_pub_topic = Cfg.get('app.mqtt_topic')+'/state/'+device_id;
let mqtt_sub_topic = Cfg.get('app.mqtt_topic')+'/control/'+device_id;
let mqtt_heartbeat_topic = Cfg.get('app.mqtt_topic')+'/heartbeat/'+device_id;

let sendMsg = function(topic, message) {
  let ok = MQTT.pub(topic, message, 1);
  if (debug) {
    if (!ok) {
      print('ERROR', topic, '<-', message);
    } else {
      print(topic, '<-', message);
    }
  }
};

let pubMsg = function() {
  let message = JSON.stringify({
    uptime: Sys.uptime(),
    device_id: device_id,
    switches: [switch1_value, switch2_value]
  });
  sendMsg(mqtt_pub_topic, message);
  // send heartbeat for uptime check
  sendMsg(mqtt_heartbeat_topic, 'OK');
};

MQTT.sub(mqtt_sub_topic, function(conn, topic, msg) {
  // LED
  GPIO.write(led_pin, 1);
  if (debug) {
    print(topic, '->', msg);
  }
  let obj = JSON.parse(msg);
  if (debug) {
    print(obj.state)
  }
  switch1_value = obj.state[0]
  GPIO.write(switch1_pin, !switch1_value);
  switch2_value = obj.state[1]
  GPIO.write(switch2_pin, !switch2_value);
  pubMsg();
  // disable LED
  GPIO.write(led_pin, 0);
}, null);

let heartbeat_interval_s = Cfg.get('app.heartbeat_pub_interval_s');
if (debug) {
  heartbeat_interval_s = 5;
}
print('Hearbeat interval=', heartbeat_interval_s, 's');
Timer.set(heartbeat_interval_s * 1000, true /* repeat */, function() {
  // LED
  GPIO.write(led_pin, 1);
  pubMsg();
  // disable LED
  GPIO.write(led_pin, 0);
}, null);