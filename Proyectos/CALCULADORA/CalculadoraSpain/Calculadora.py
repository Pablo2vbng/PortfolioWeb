from tkinter import *
import random
import winsound



#poner música cuando ejecutamos el programa
winsound.PlaySound('Himno-Espana-Track.wav', winsound.SND_LOOP + winsound.SND_ASYNC)


ventana = Tk()
ventana.title("Calculadora Viva España")
i = 0
ventana.iconbitmap("banderaespana.ico")
ventana.config(bd=10)
#imagen = PhotoImage(file = "banderaespana.png")
#background = Label(image = imagen)
#background.place(x = 0, y = 0, relwidth = 2, relheight = 1)
ventana.config(cursor="pirate")
ventana.config(relief="raised")



#entrada de texto
e_texto = Entry(ventana, font= ("Calibri 20"))
e_texto.grid(row=0, column=0, columnspan=4, padx=10,pady=5)

#funciones
def click_boton(valor):
    global i
    e_texto.insert(i,valor)
    i += 1

def borrar():
    e_texto.delete(0,END)
    i=0

def hacer_operacion():
    ecuacion = e_texto.get()
    resultado =eval(ecuacion)
    e_texto.delete(0,END)
    e_texto.insert(0,resultado)
    i=0

def changeBG():
    ventana.config(background="yellow")
    colors=("red", "yellow")
    random_colors=random.choice(colors)
    ventana.config(background=random_colors)




#Botones

boton1 = Button (ventana, text="1", width = 5, height= 2, font= ("calibri 12"), command = lambda: click_boton(1), bg="grey")
boton2 = Button (ventana, text="2", width = 5, height= 2, font= ("calibri 12"), command = lambda: click_boton(2), bg="grey")
boton3 = Button (ventana, text="3", width = 5, height= 2, font= ("calibri 12"), command = lambda: click_boton(3), bg="grey")
boton4 = Button (ventana, text="4", width = 5, height= 2, font= ("calibri 12"), command = lambda: click_boton(4), bg="grey")
boton5 = Button (ventana, text="5", width = 5, height= 2, font= ("calibri 12"), command = lambda: click_boton(5), bg="grey")
boton6 = Button (ventana, text="6", width = 5, height= 2, font= ("calibri 12"), command = lambda: click_boton(6), bg="grey")
boton7 = Button (ventana, text="7", width = 5, height= 2, font= ("calibri 12"), command = lambda: click_boton(7), bg="grey")
boton8 = Button (ventana, text="8", width = 5, height= 2, font= ("calibri 12"), command = lambda: click_boton(8), bg="grey")
boton9 = Button (ventana, text="9", width = 5, height= 2, font= ("calibri 12"), command = lambda: click_boton(9), bg="grey")
boton0 = Button (ventana, text="0", width = 5, height= 2, font= ("calibri 12"), command = lambda: click_boton(0), bg="grey")
boton_abajoderecha = Button (ventana, text="VIVA", width = 5, height= 2,command=changeBG )


boton_borrar1 = Button (ventana, text="CE", width = 5, height= 2, font= ("calibri 14"), command = lambda: borrar(), bg="white")
boton_parentesis1 = Button (ventana, text="(", width = 5, height= 2, font= ("calibri 14"), command =lambda: click_boton("("), bg="white")
boton_parentesis2 = Button (ventana, text=")", width = 5, height= 2, font= ("calibri 14"), command =lambda: click_boton(")"), bg="white")
boton_punto = Button (ventana, text=".", width = 5, height= 2, font= ("calibri 14"), command = lambda: click_boton("."), bg="white")

boton_suma = Button (ventana, text="+", width = 5, height= 2, font= ("calibri 14"), command = lambda: click_boton("+"), bg="white")
boton_resta = Button (ventana, text="-", width = 5, height= 2, font= ("calibri 14"), command = lambda: click_boton("-"), bg="white")
boton_multiplicacion = Button (ventana, text="x", width = 5, font= ("calibri 14"), height= 2, command = lambda: click_boton("*"), bg="white")
boton_division = Button (ventana, text="/", width = 5, height= 2, font= ("calibri 14"), command = lambda: click_boton("/"), bg="white")
boton_igual = Button (ventana, text="=", width = 5, height= 2, font= ("calibri 14"), command = lambda: hacer_operacion(), bg="white")

#agregar botones en pantalla

boton_borrar1.grid(row =1 , column =0 , padx = 5, pady = 5)
boton_parentesis1.grid(row =1 , column =1 , padx = 5, pady = 5)
boton_parentesis2.grid(row =1 , column =2 , padx = 5, pady = 5)
boton_division.grid(row =1 , column =3 , padx = 5, pady = 5)

boton7.grid(row =2 , column =0 , padx = 5, pady = 5)
boton8.grid(row =2 , column = 1, padx = 5, pady = 5)
boton9.grid(row =2 , column = 2, padx = 5, pady = 5)
boton_multiplicacion.grid(row =1 , column =3 , padx = 5, pady = 5)

boton4.grid(row =3 , column =0 , padx = 5, pady = 5)
boton5.grid(row =3 , column =1 , padx = 5, pady = 5)
boton6.grid(row =3 , column =2 , padx = 5, pady = 5)
boton_division.grid(row =2 , column =3 , padx = 5, pady = 5)

boton1.grid(row =4 , column =0 , padx = 5, pady = 5)
boton2.grid(row =4 , column =1 , padx = 5, pady = 5)
boton3.grid(row =4 , column =2 , padx = 5, pady = 5)
boton_suma.grid(row =4 , column =3 , padx = 5, pady = 5)

boton0.grid(row =5 , column =1 , padx = 5, pady = 5)
boton_resta.grid(row =3 , column =3 , padx = 5, pady = 5)
boton_igual.grid(row =5 , column =2 , padx = 5, pady = 5)
boton_punto.grid(row =5 , column =0 , padx = 5, pady = 5)
boton_abajoderecha.grid(row =5 , column =3 , padx = 5, pady = 5)


 




ventana.mainloop()


