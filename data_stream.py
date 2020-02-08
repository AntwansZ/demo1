## Generator of data

import random as rd
import numpy as np
from time import sleep

FILE_PATH = "resources/data.csv"

class DataGenerator :

  def gen_ph(self):
    return np.round(rd.random()*14, 1)

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

  def stream(self):
    file = open(FILE_PATH, "w")

    #writing csv header

    file.write("ph,iron_rate,chlorine_rate,magnesium_rate\n")
    while(True):
      rec = self.gen_record()
      str_to_write = str(rec['ph']) + "," + str(rec['iron_rate']) + ","
      str_to_write += str(rec['chlorine_rate']) + "," + str(rec['magnesium_rate']) + "\n"
      file.write(str_to_write)
      sleep(0.5)

dg = DataGenerator()
dg.stream()