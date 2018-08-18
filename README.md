# NX Event Bus

[![Build Status](https://travis-ci.org/pinkahd/nx-event-bus.svg?branch=master)](https://travis-ci.org/pinkahd/nx-event-bus)
[![npm version](https://badge.fury.io/js/nx-event-bus.svg)](https://badge.fury.io/js/nx-event-bus)

A simple implementation of an event bus for JavaScript. It's main features is taking care of 'dead events'.

A 'dead event' is when there aren't any listener for the broadcasted event. If such event occurs the event will be saved until a listener will get created and it will be rebroadcasted;

## :memo: Documentation

**[NX Event Bus Documentation](https://github.com/pinkahd/nx-event-bus/blob/master/docs/documentation.md)** – _Github version_

**[Web Formatted Version](https://alexandru-pinca.me/projects/nx-event-bus/docs/)** – _The same as above but web-formatted._


## :cloud: Installation

```
$ npm i nx-event-bux --save
```

## :wrench: Development

1. Clone the repository.
2. Run `npm i` in the project root
3. Start coding

## :recycle: Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## :scroll: License

Copyright 2018 Alexandru L. Pinca

Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements. See the NOTICE file distributed with this work for additional information regarding copyright ownership. The ASF licenses this file to you under the Apache License, Version 2.0 (the “License”); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an “AS IS” BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
