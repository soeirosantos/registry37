[![Build Status](https://travis-ci.org/soeirosantos/registry37.svg?branch=master)](https://travis-ci.org/soeirosantos/registry37)

# Registry37 - A Simple Metadata Registry application

The Registry37 is a *lightweight* application for storing and managing application service metadata. 

While working with distributed services, it's useful to keep the configuration externalized and remotely discoverable. It could bring some benefits like: (re-)configure the application in runtime; run the application in multiple environments with minimum effort; change the routing to backend services and so on - without any code changes or artifacts distribution.

Some example of metadata that can be kept are: `nonSecurePort`, `securePort`, `virtualHostname`, `secureVirtualHostname`, `hostName`, `ipAddress`, `statusPageUrlPath`, `statusPageUrl`, `homePageUrl`
`healthCheckUrl`, `secureHealthCheckUrl`, etc

For more details on the motivation, benefits, and drawbacks of this approach, please, check: 
* [Externalized Configuration](http://microservices.io/patterns/externalized-configuration.html)
* [Service Registry](http://microservices.io/patterns/service-registry.html)
* [Server Sidde Discovery](http://microservices.io/patterns/server-side-discovery.html)

## Architecture

The Registry37 is composed by a REST API, used to manage and discovery metadata and a Pub/Sub messaging channel, for metadata discovering.

## REST API

For this version, the following operations can be used to manage metadata:

| Operation | Description |
| --------- | ----------- |
| `GET  /apps` | get all apps |
| `GET  /apps/:appName` | get all instances of this app |
| `POST /apps/:appName` | register a new Application |
| `GET  /apps/:appName/instances/:instanceId` | get all metadata for this specific instance |
| `POST /apps/:appName/instances/:instanceId` | register a new instanceId |
| `GET  /apps/:appName/instances/:instanceId/metadata/keys`| return the keys for the metadata stored |
| `GET  /apps/:appName/instances/:instanceId/metadata/:keyName`|return the configuration required |
| `POST  /apps/:appName/instances/:instanceId/metadata` | create or update a metadata entry |

## Pub/Sub Messaging Channel

The Pub/Sub Messaging Channel is a Redis-based service where clients (subscribers) can listen to a channel and retrieve the metadata. It's the easiest way to keep up to date without the need of polling the API.

The metadata is sent to the channel in a `key/value` pair where a namespace `app:instanceId:keyName` is used as a key.

Example:

| key | value |
| --- | ----- |
| user-mngmt:i-0acb33e31d0c3d1ce:healthCheckUrl | http://someaddress.com/api/v3/health |

## Production-ready applications for Externalized Configuration

For now, this application is a Proof of Concept and an *in-progress* work. If you'd need an application for keeping externalized configuration and/or service registry, please, check out the following applications:

* [Eureka](https://github.com/Netflix/eureka)
* [Apache Zookeeper](http://zookeeper.apache.org/)
* [Consul](https://www.consul.io/)
* [Etcd](https://github.com/coreos/etcd)
