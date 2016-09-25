<?php
     $dbh = new PDO("mysql:host=localhost;dbname=MedicWhere;charset=utf8", "root", "");
     
     $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$user = $dbh->prepare('SELECT * FROM users where id=1');

           $user->execute();
           while ($data_util = $user->fetch()) {
	$tab_rdv['nom'][]=$data_util['forename'];
	$tab_rdv['prenom'][]=$data_util['surname'];
	$tab_rdv['adressemail'][]=$data_util['email'];
	
}
echo json_encode($tab_rdv);
?>