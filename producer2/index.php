<?php
$timeout_ms=5000;
$conf = new RdKafka\Conf();
$conf->set('log_level', (string) LOG_DEBUG);
$conf->set('debug', 'all');
$rk = new RdKafka\Producer($conf);
$rk->addBrokers("172.19.0.3:9092");
$topic = $rk->newTopic("topic3");
$try=$topic->produce(RD_KAFKA_PARTITION_UA, RD_KAFKA_MSG_F_BLOCK, "Message payload");
$rk->flush($timeout_ms);
if($try){
    echo "done";
}
echo "producer2";
?>

