<?php

ini_set( 'display_errors', 0 );


mb_language( 'Japanese' );
mb_internal_encoding( 'UTF-8' );


$post = array();
foreach( $_POST as $key => $val ){
  if( $val ) $post[ $key ] = htmlspecialchars( $val );
}

//宛先
$admin = 'nunifuchisaka@gmail.com';

//$to = '';
//$to = $admin;

$header = "From:".mb_encode_mimeheader($post['name'])."<{$post['email']}>";
$header .= PHP_EOL."Bcc:{$admin}";
$subject = "";
$body = "\n";
$body .= "\n"."お名前：". $post['name'];
$body .= "\n"."メールアドレス：". $post['email'];
$body .= "\n"."住所：". $post['address'];
$body .= "\n"."電話番号：". $post['tel'];
//$body .= "\n"."用件：". $post['matter'];
switch ( $post['matter'] ) {
  case '':
    $body .= "\n：". $post[''];
    $body .= "\n：". $post[''];
    break;
  case '':
    $body .= "\n：". $post[''];
    $body .= "\n：". $post[''];
    break;
  default:
    
    break;
}
$body .= "\n"."メッセージ："."\n". $post['message'];

$cc = "-f {$admin}";

ini_set( 'sendmail_from', $admin );

if( mb_send_mail( $to, $subject, $body, $header, $cc ) ) {
  
  header('Location: ' . $post['success_page_url']);
  exit;
  
} else {
  
  header('Location: ' . $post['error_page_url']);
  exit;
  
}


?>