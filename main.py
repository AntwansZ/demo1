from tkinter import *
from PIL import Image, ImageTk

img_path = "img/france.jpg"
img_h = 0
img_w = 0

class Window(Frame):

  def __init__(self, master=None):
    Frame.__init__(self, master)
    self.master = master
    self.pack(fill=BOTH, expand=1)
    
    load = Image.open(img_path)

    render = ImageTk.PhotoImage(load)
    img = Label(self, image=render)
    img.image = render
    img.place(x=0, y=0)

root = Tk()
win = Window(root)
root.geometry("730x701")
root.mainloop()