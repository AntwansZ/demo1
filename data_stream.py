## Generator of data

import random as rd
import numpy as np

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


dg = DataGenerator()

print(dg.gen_record())