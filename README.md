<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

## About The Project

See my write-up on [IoT with Mongoose OS](https://tailucas.github.io/update/2023/06/07/iot-with-mongoose-os.html). Here you can find a brief write-up about my projects based on Mongoose OS and my general experience with this IoT platform.

This is a [Mongoose OS][mongoose-url] project containing a [configuration template][app-config-url] and [code][app-script-url] written in the so-called minimal JavaScript or [mJS](https://github.com/cesanta/mjs).

### How it works

If you have ever used a [smart switch](https://sonoff.tech/product/diy-smart-switches/basicr2/) this project does basically the same thing, but responds to messages sent over MQTT. If you were to try something like this yourself, I would recommend looking at platforms that make this work a more compatible out the box with other automation frameworks such as [Tasmota](https://tasmota.github.io/docs/).

### Basic operation

At startup, GPIO channels are initialized and a timer is enabled to publish heartbeat messages. Using the configured topic paths, an MQTT client is created to receive control JSON-encoded control messages and then respond with the latest switch state. Switch state changes update globals which are used in MQTT message responses and heartbeats because GPIO channel states could not be read with the GPIO channels in `OUTPUT` mode.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

Technologies that help make this project useful:

[![Espressif][esp-shield]][esp-url]
[![Mongoose OS][mongoose-shield]][mongoose-url]
[![MQTT][mqtt-shield]][mqtt-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

Here is some detail about the intended use of this project.

## Prerequisites

Your development environment needs to have the `mos` [tool][mos-tool-url] available to build firmware binaries and for first-time configuration of the device. Mongoose OS has a good [getting started guide][mos-install-url] with installation instructions.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

The Mongoose OS [documentation](https://mongoose-os.com/docs/mongoose-os/userguide/build.md) provides a detailed but concise instruction on how to use the `mos` tool to build the binaries that can then either be flashed directly to a USB-connected IoT device or that can be uploaded to the [mDash][mdash-url] site and delivered as an [OTA update](https://mongoose-os.com/docs/mongoose-os/userguide/ota.md).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Template on which this README is based](https://github.com/othneildrew/Best-README-Template)
* [All the Shields](https://github.com/progfay/shields-with-icon)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/tailucas/switch-app.svg?style=for-the-badge
[contributors-url]: https://github.com/tailucas/switch-app/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/tailucas/switch-app.svg?style=for-the-badge
[forks-url]: https://github.com/tailucas/switch-app/network/members
[stars-shield]: https://img.shields.io/github/stars/tailucas/switch-app.svg?style=for-the-badge
[stars-url]: https://github.com/tailucas/switch-app/stargazers
[issues-shield]: https://img.shields.io/github/issues/tailucas/switch-app.svg?style=for-the-badge
[issues-url]: https://github.com/tailucas/switch-app/issues
[license-shield]: https://img.shields.io/github/license/tailucas/switch-app.svg?style=for-the-badge
[license-url]: https://github.com/tailucas/switch-app/blob/main/LICENSE

[app-script-url]: https://github.com/tailucas/switch-app/blob/master/fs/init.js
[app-config-url]: https://github.com/tailucas/switch-app/blob/master/mos.yml

[esp-url]: https://www.espressif.com/
[esp-shield]: https://img.shields.io/static/v1?style=for-the-badge&message=Espressif&color=E7352C&logo=Espressif&logoColor=FFFFFF&label=
[mdash-url]: https://mdash.net/home/
[mongoose-url]: https://mongoose-os.com/
[mongoose-shield]: https://img.shields.io/static/v1?style=for-the-badge&message=Mongoose&color=880000&logo=Mongoose&logoColor=FFFFFF&label=
[mos-tool-url]: https://mongoose-os.com/docs/mongoose-os/userguide/mos-tool.md
[mos-install-url]: https://mongoose-os.com/docs/mongoose-os/quickstart/setup.md
[mqtt-url]: https://mqtt.org/
[mqtt-shield]: https://img.shields.io/static/v1?style=for-the-badge&message=MQTT&color=660066&logo=MQTT&logoColor=FFFFFF&label=
