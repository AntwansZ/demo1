## Generator of data

import random as rd
import numpy as np
from time import sleep

from kafka import KafkaProducer
from kafka.errors import KafkaError

import sys

# FILE_PATH = "resources/data.csv"

class DataGenerator :

  def gen_ph(self):
    return np.round(np.random.normal(7, 0.2), 1)

  def gen_FE_rate(self):
    return np.round(np.random.normal(0.7, 0.2), 2)
    # in mg/L

  def gen_CL_rate(self):
    return np.round(np.random.normal(0.6, 0.2), 2)
    # in mg/L

  def gen_Mg_rate(self):
    return np.round(np.random.normal(10, 6), 1)
    # in mg/L

  def gen_record(self):
    return {"ph" : self.gen_ph(), "iron_rate" : self.gen_FE_rate(), 
      "chlorine_rate" : self.gen_CL_rate(), "magnesium_rate" : self.gen_Mg_rate()}

  def stream(self, kafka_pipe, station_number):
    # file = open(FILE_PATH, "w")

    #writing csv header

    # file.write("ph,iron_rate,chlorine_rate,magnesium_rate\n")
    while(True):
      rec = self.gen_record()
      str_to_write = str(rec['ph']) + "," + str(rec['iron_rate']) + ","
      str_to_write += str(rec['chlorine_rate']) + "," + str(rec['magnesium_rate'])
      str_to_write += "," + str(station_number)
      kafka_pipe.send('water', str_to_write.encode())
      sleep(0.5)

def connect_kafka_producer() :
  producer = KafkaProducer()
  return producer

# connect_kafka_producer()

def main() :
  if(len(sys.argv)) > 1 :
    no_station = sys.argv[1]
    print(no_station)
  else :
    sys.exit("A station number needs to be specified")
  producer = connect_kafka_producer()
  dg = DataGenerator()
  dg.stream(producer, no_station)

if __name__ == '__main__':
  main()