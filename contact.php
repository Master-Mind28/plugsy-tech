<?php
// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "portfolio_contact";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérification de la connexion
if ($conn->connect_error) {
    die("Connexion échouée : " . $conn->connect_error);
}

// Vérification si le formulaire est soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $conn->real_escape_string($_POST['name']);
    $mobile_number = $conn->real_escape_string($_POST['email']);
    $email = $conn->real_escape_string($_POST['email']);
    $message = $conn->real_escape_string($_POST['message']);

    // Insertion des données dans la table
    $sql = "INSERT INTO contacts (name, mobile_number, email, message)
            VALUES ('$name', '$mobile_number', '$email', '$message')";

    if ($conn->query($sql) === TRUE) {
        // Envoi d'un e-mail à votre boîte mail
        $to = "aymardovono28@icloud.com"; // Remplacez par votre adresse e-mail
        $subject = "Nouveau message de $name";
        $body = "Nom : $name\nNuméro de téléphone : $mobile_number\nE-mail : $email\nMessage :\n$message";
        $headers = "From: $email";

        if (mail($to, $subject, $body, additional_headers: $headers)) {
            echo "Message envoyé avec succès !";
        } else {
            echo "Erreur lors de l'envoi de l'e-mail.";
        }
    } else {
        echo "Erreur : " . $sql . "<br>" . $conn->error;
    }
}

// Fermeture de la connexion
$conn->close();
?>