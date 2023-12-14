<?php
echo "Consumer 2\n";
$conf = new RdKafka\Conf();
$conf->set('log_level', (string) LOG_DEBUG);
$conf->set('debug', 'all');
$rk = new RdKafka\Consumer($conf);
$rk->addBrokers("172.19.0.3");
$topic = $rk->newTopic("topic3");
$topic->consumeStart(1, RD_KAFKA_OFFSET_BEGINNING);
function setInterval($f, $milliseconds)
{
    $seconds=(int)$milliseconds/1000;
    while(true)
    {
        $f();
        sleep($seconds);
    }
}
//echo $topic;
setInterval(function(){
    $msg = $topic->consume(1, 1000);
    if (null === $msg || $msg->err === RD_KAFKA_RESP_ERR__PARTITION_EOF) {
        
    } elseif ($msg->err) {
        echo $msg->errstr(), "\n";
    } else {
        echo $msg->payload, "\n";
    }
},1000);
