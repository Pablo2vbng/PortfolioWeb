package controllers;

import dataBase.ISchemaDB;

import java.sql.*;
import java.util.Scanner;


public class DBcontroller implements ISchemaDB {
    Connection connection;
    public void getConnection(){
        String url = "jdbc:mysql://" + URL + "/" + DB_NAME;
        try{
            connection = DriverManager.getConnection(url, USER, PASSWORD);

        } catch (Exception e) {
            System.out.println("Error de conexión: " + e);
        }
    }
    public void closeConnection() {
        try{
            connection.close();
            System.out.println("Se ha cerrado la conexión mamones");
        }catch (Exception e){
            System.out.println("Error al cerrar la conexión : " + e);
        }

}
    public void addUser(){

        getConnection();
        try{
            System.out.println("*** INSERTAR USUSRIO ***");
            Scanner sc = new Scanner(System.in);
            System.out.print("Nombre: ");
            String nombre = sc.nextLine();
            System.out.print("Apellido: ");
            String apellido = sc.nextLine();
            System.out.print("Teléfono: ");
            int telefono = sc.nextInt();
            System.out.print("Sueldo: ");
            int sueldo = sc.nextInt();
            System.out.print("País: ");
            String pais = sc.nextLine();
            sc.nextLine();
            System.out.print("Perfil: ");
            int perfil = sc.nextInt();
            Statement st = connection.createStatement();
            // Nombre, apellido, telefono, sueldo, pais, perfil
            String query = "INSERT INTO %s (%s,%s,%s,%s,%s,%s) VALUES ('%s','%s',%d ,%d ,'%s', %d)";
            String queryFormateada = String.format(query, ISchemaDB.TAB_USUARIO, ISchemaDB.COL_NOMBRE, ISchemaDB.COL_APELLIDO, ISchemaDB.COL_telefono, ISchemaDB.COL_SUELDO, ISchemaDB.COL_PAIS, ISchemaDB.COL_PERFIL
            ,nombre, apellido,telefono, sueldo, pais, perfil);
            st.execute(queryFormateada);
            System.out.println("Se ha añadido el registro");
            try{
                connection.close();
            }catch (Exception e){
                System.out.println("Fallo al cerrar la conexión: " + e);
            }

        } catch (Exception e) {
            System.out.println("Ha ocurrido un error: " + e);
        }
    }
    public void readUser(){
        getConnection();
        try{
            Statement st = connection.createStatement();
            String query = "SELECT * FROM %s";
            String queryFormateada = String.format(query, ISchemaDB.TAB_USUARIO);
            ResultSet rs = st.executeQuery(queryFormateada);
            while (rs.next()) {
                int id = rs.getInt(ISchemaDB.COL_ID);
                String nombre = rs.getString(ISchemaDB.COL_NOMBRE);
                String apellido = rs.getString(ISchemaDB.COL_APELLIDO);
                int telefono = rs.getInt(ISchemaDB.COL_telefono);
                int sueldo = rs.getInt(ISchemaDB.COL_SUELDO);
                String pais = rs.getString(ISchemaDB.COL_PAIS);
                int perfil = rs.getInt(ISchemaDB.COL_PERFIL);
                System.out.println("Id: " + id + ", Nombre: " + nombre + ", Apellido: " + apellido + ", Teléfono: " + telefono +
                        ", Sueldo: " + sueldo + ", País: "+ pais + ", Perfil: " + perfil );
            }
            rs.close();

            try{
                connection.close();
            }catch (Exception e){
                System.out.println("Error al cerrar la conexión: " + e);
            }

        }catch (Exception e){
            System.out.println("No se ha establecido la conexión: " + e);
        }


    }
    public void modifyUser(){
        getConnection();
        try{
            Statement st = connection.createStatement();
            //UPDATE usuario
            //SET nombre = 'Carlos', apellido = 'Gómez', edad = 30
            //WHERE id = 1;
            //// Nombre, apellido, telefono, sueldo, pais, perfil
            Scanner sc = new Scanner(System.in);
            System.out.println("Dime el id del usuario que quieres modificar");
            int id = sc.nextInt();
            sc.nextLine();
            System.out.println("Datos a modificar: ");
            System.out.print("Nombre: ");
            String nombre = sc.nextLine();
            System.out.print("Apellido: ");
            String apellido = sc.nextLine();
            System.out.print("Teléfono: ");
            int telefono = sc.nextInt();
            System.out.print("Sueldo: ");
            int sueldo = sc.nextInt();
            System.out.print("País: ");
            String pais = sc.nextLine();
            sc.nextLine();
            System.out.print("Perfil: ");
            int perfil = sc.nextInt();
            String query = "UPDATE %s SET %s = '%s',%s = '%s', %s = %d, %s = %d, %s = '%s', %s = %d WHERE id = %d";
            String queryFormateada = String.format(query, ISchemaDB.TAB_USUARIO, ISchemaDB.COL_NOMBRE, nombre, ISchemaDB.COL_APELLIDO, apellido
            , ISchemaDB.COL_telefono, telefono, ISchemaDB.COL_SUELDO, sueldo, ISchemaDB.COL_PAIS, pais, ISchemaDB.COL_PERFIL, perfil
            ,id );
            st.executeUpdate(queryFormateada);
            System.out.println("Listado actualizado:");
            readUser();
            try{
                connection.close();
            } catch (SQLException e) {
                System.out.println("Error al cerrar conexión: " + e);
            }

        }catch (Exception e){
            System.out.println("No se puede conectar: " + e);
        }
    }
    public void deleteRegister(){
        getConnection();
        try{
            System.out.println("Indica el id del registro que quieres borrar");
            System.out.println("Id: ");
            Scanner sc = new Scanner(System.in);
            int id = sc.nextInt();
            Statement st = connection.createStatement();
            String query = "DELETE FROM %s WHERE %s = %d";
            String queryModificada = String.format(query, DBcontroller.TAB_USUARIO, DBcontroller.COL_ID, id);
            st.executeUpdate(queryModificada);
            System.out.println("Tabla actualizada: ");
            readUser();
            try{
                connection.close();
            }catch (Exception e){
                System.out.println("Error al cerrar la conexión: " + e);
            }
        } catch (Exception e) {
            System.out.println("Error de conexion: " + e);
        }
    }

}
