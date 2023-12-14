# Using Docker Compose to use Kafka with multiple consumers and producers
## Description and Objective
### Description
The project is proposed to have a Kafka server with Zookeeper, 2
consumers, and 2 Producers. All are working together to accomplish the
following:
- Send data from multiple producers with different programming languages
- Distribute data among more than 1 topic in Kafka
- Get data from kafka topics to consumers
- All are distributed among different IPs
- Using docker and docker-compose
### Objective
The goal to apply on idea of using different apps in different
languages to validate idea of Decoupling between consumers and producers 
## Running code
1. Download or pull code
2. Run `docker-compose up` in main folder
3. Check with `docker ps` to make sure all containers are working
## Some problems you may face
- "error: In the middle of leadership election"<br>
    **Makesure you made more than 1 partition for topic**
- "error: connection refused"<br>
**use `docker network ls` to get name of network for kafka then run `docker network inspect <name-of-kafka-network>` to get the IP of kafka broker and update it in producers and consumers**
- "error: pruging (which data not added)"<br>
**Increase timeout and check flushing options before closing connection**
