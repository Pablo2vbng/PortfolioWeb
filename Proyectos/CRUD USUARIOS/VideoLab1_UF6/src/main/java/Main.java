import controllers.DBcontroller;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        DBcontroller dBcontroller = new DBcontroller();
        int opcion = 0;
        while (opcion!=5){
            System.out.println("BASE DE DATOS");
            System.out.print("""
                    Escoja una opción
                    1. Añadir Usuario
                    2. Ver todos los Usuarios
                    3. Modificar Usuario
                    4. Borrar Usuario
                    5. Salir
                    Opción: """);
            Scanner sc = new Scanner(System.in);
            opcion = sc.nextInt();
            switch (opcion){
                case 1 :
                    dBcontroller.addUser();
                    System.out.println();
                    break;
                case 2 :
                    dBcontroller.readUser();
                    System.out.println();
                    break;
                case 3 :
                    dBcontroller.modifyUser();
                    System.out.println();
                    break;
                case 4 :
                    dBcontroller.deleteRegister();
                    System.out.println();
                    break;
                case 5 :
                    System.out.println("Has salido del programa");
                    break;
                default:
                    System.out.println("Opcion incorrecta. Vuelva a intentarlo");
            }

        }



    }
}
