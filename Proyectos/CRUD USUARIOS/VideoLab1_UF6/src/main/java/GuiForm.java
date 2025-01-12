import com.formdev.flatlaf.FlatDarculaLaf;
import controllers.DBcontroller;
import dataBase.ISchemaDB;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Scanner;

public class GuiForm extends JFrame implements ISchemaDB {
    private JPanel panelPrincipal;
    private JTextField textNombre;
    private JTextField textApellido;
    private JTextField textTelefono;
    private JTextField textSueldo;
    private JTextField textPais;
    private JTextField textPerfil;
    private JButton btnAnadir;
    private JButton btnEliminar;
    private JTextField idDeUsusarioTextField;
    private JTextArea textListado;
    private JButton mostrarUsuariosButton;
    private JButton salirButton;
    Connection connection;

    public void getConnection(){
        String url = "jdbc:mysql://" + URL + "/" + DB_NAME;
        try{
            connection = DriverManager.getConnection(url, USER, PASSWORD);
            System.out.println(connection.getCatalog());

        } catch (Exception e) {
            System.out.println("Error de conexión: " + e);
        }
    }
    public GuiForm() {
        verPanel();
        btnAnadir.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                getConnection();
                try{

                    Scanner sc = new Scanner(System.in);
                    String nombre = textNombre.getText();
                    String apellido = textApellido.getText();
                    int telefono = Integer.parseInt(textTelefono.getText());
                    int sueldo = Integer.parseInt(textSueldo.getText());
                    String pais = textPais.getText();
                    int perfil = Integer.parseInt(textPerfil.getText());
                    Statement st = connection.createStatement();
                    // Nombre, apellido, telefono, sueldo, pais, perfil
                    String query = "INSERT INTO %s (%s,%s,%s,%s,%s,%s) VALUES ('%s','%s',%d ,%d ,'%s', %d)";
                    String queryFormateada = String.format(query, ISchemaDB.TAB_USUARIO, ISchemaDB.COL_NOMBRE, ISchemaDB.COL_APELLIDO, ISchemaDB.COL_telefono, ISchemaDB.COL_SUELDO, ISchemaDB.COL_PAIS, ISchemaDB.COL_PERFIL
                            ,nombre, apellido,telefono, sueldo, pais, perfil);
                    st.execute(queryFormateada);
                    System.out.println("Se ha añadido el registro");
                    try{
                        connection.close();
                    }catch (Exception f){
                        System.out.println("Fallo al cerrar la conexión: " + f);
                    }

                } catch (Exception g) {
                    System.out.println("Ha ocurrido un error: " + g);
                }
            }
        });
        btnEliminar.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent a) {
                getConnection();
                try{
                    int id = Integer.parseInt(idDeUsusarioTextField.getText());
                    Statement st = connection.createStatement();
                    String query = "DELETE FROM %s WHERE %s = %d";
                    String queryModificada = String.format(query, DBcontroller.TAB_USUARIO, DBcontroller.COL_ID, id);
                    st.executeUpdate(queryModificada);
                    System.out.println("Registro eliminado");
                    try{
                        connection.close();
                    }catch (Exception f){
                        System.out.println("Error al cerrar la conexión: " + f);
                    }
                } catch (Exception e) {
                    System.out.println("Error de conexion: " + e);
                }
            }
        });
        mostrarUsuariosButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                textListado.setText("");
                getConnection();
                try{
                    Statement st = connection.createStatement();
                    String query = "SELECT * FROM %s";
                    String queryFormateada = String.format(query, ISchemaDB.TAB_USUARIO);
                    ResultSet rs = st.executeQuery(queryFormateada);
                    while (rs.next()) {
                        int id = rs.getInt(ISchemaDB.COL_ID);
                        String idString = String.valueOf(id);
                        String nombre = rs.getString(ISchemaDB.COL_NOMBRE);
                        String apellido = rs.getString(ISchemaDB.COL_APELLIDO);
                        int telefono = rs.getInt(ISchemaDB.COL_telefono);
                        int sueldo = rs.getInt(ISchemaDB.COL_SUELDO);
                        String pais = rs.getString(ISchemaDB.COL_PAIS);
                        int perfil = rs.getInt(ISchemaDB.COL_PERFIL);
                        System.out.println("Id: " + id + ", Nombre: " + nombre + ", Apellido: " + apellido + ", Teléfono: " + telefono +
                                ", Sueldo: " + sueldo + ", País: "+ pais + ", Perfil: " + perfil );
                        textListado.append("Id: " + id + ", Nombre: " + nombre + ", Apellido: " + apellido + "\n" );


                    }
                    rs.close();

                    try{
                        connection.close();
                    }catch (Exception f){
                        System.out.println("Error al cerrar la conexión: " + f);
                    }

                }catch (Exception g){
                    System.out.println("No se ha establecido la conexión: " + g);
                }

            }
        });
        salirButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.exit(0);
            }
        });
    }

    public void verPanel() {
        setContentPane(panelPrincipal);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setSize(800, 600); // Ajusta el tamaño de la ventana
    }

    public static void main(String[] args) {
        // Aplicar el tema
        FlatDarculaLaf.setup();

        SwingUtilities.invokeLater(() -> {
            GuiForm guiForm = new GuiForm();
            guiForm.setVisible(true);
            guiForm.setLocationRelativeTo(null);
        });
    }

}
