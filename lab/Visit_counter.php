<?php
$counterFile = "counter.txt";

// Initialize counter if file doesn't exist
if (!file_exists($counterFile)) {
    file_put_contents($counterFile, "0");
}

// Read and increment visitor count
$visitorCount = (int) file_get_contents($counterFile) + 1;
file_put_contents($counterFile, $visitorCount);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visitor Counter</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; background-color: #f4f4f4; }
        h1 { color: #333; }
        p { font-size: 1.5em; color: #555; }
    </style>
</head>
<body>
    <h1>Welcome to My Website</h1>
    <p>You are visitor number: <strong><?php echo $visitorCount; ?></strong></p>
</body>
</html>
