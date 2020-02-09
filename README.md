# demo1
demo xtralab


1 - Start zookeeper : 
```sh
sh /bin/zkStart.sh start 
```

2 - Start Kafka Server : 
```sh
sh /bin/kafka-server-start.sh /usr/share/kafka/config/server.properties
```


- to read messages sent to the pipe
```sh
sh /bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic water
```

