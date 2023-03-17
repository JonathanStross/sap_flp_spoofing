<?php



$filename = 'credentials.txt';

$f = fopen($filename, 'wb');
if (!$f)
{
    die('Error creating file');
}
fputs($f, var_dump($_GET));
fclose($f);