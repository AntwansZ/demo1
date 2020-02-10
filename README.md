# Demo 
This demo is supposed to quickly show, a few hours of work. It simulates the sending of some data into a Kafka Pipeline, that is consumed by a node.js server, to provide a simple front js interface to display the data collected from various sources. 

The data is produced by a python script. It generates an array of 4 values, that respectively simulates PH,  iron content, chlorine content, magnesium content, in water.

The python script feeds that data into a Apache Kafka pipeline.
Kafka is a distributed multi-producer multi-consumer message delivery pipeline. It simulates accurately what a real data collection system would resemble, between let's say water analysis stations, and a central server.

Then a Node.JS server consumes the data from the Kafka pipeline, and processes it to display it in graphs in a client.

Spawning a new python-producer will create a new graph, and data will start to flow in.



#### Requirements : 

* Zookeeper and Apache Kafka
* NodeJS, JS, Python3.7
  * node modules : express, kafka-node
  * python libs : numpy, kafka-python

#### Running it

1 - Start zookeeper : 

```sh
sh /bin/zkStart.sh start 
```

2 - Start Kafka Server : 
```sh
sh /bin/kafka-server-start.sh /usr/share/kafka/config/server.properties
```

3 - Start NodeJS server

```sh
node web/server.js
```

4 - Open index.html in Chrome/Safari/Firefox

5 - Spawn a python process to simulate a data-producer water analysis station. The argument is the station's number

```sh
python data_stream.py 1
```

```sh
python data_stream.py 2
```

etc ...