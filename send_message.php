<?php
$telegram_bot_token = 'YOUR_TELEGRAM_BOT_TOKEN'; // Замените на токен вашего бота
$telegram_channel_id = '@YOUR_TELEGRAM_CHANNEL'; // Замените на ID вашего канала

$telegram = $_POST['telegram'];
$email = $_POST['email'];
$question = $_POST['question'];

$message = "Новое сообщение обратной связи:\n\n";
$message .= "Telegram: " . $telegram . "\n";
$message .= "Email: " . $email . "\n";
$message .= "Вопрос: " . $question . "\n";

$url = "https://api.telegram.org/bot" . $telegram_bot_token . "/sendMessage?chat_id=" . $telegram_channel_id . "&text=" . urlencode($message);

$response = file_get_contents($url);

if ($response === FALSE) {
    echo "Ошибка при отправке сообщения.";
} else {
    echo "Сообщение успешно отправлено!";
}
?>