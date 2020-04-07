<?php
require_once 'global.php';
require_once 'validate.php';

$x = intval($_REQUEST['x']);
$y = intval($_REQUEST['y']);

if ($_REQUEST['submit']) {
  $data = $_POST['data'];

  # Validate data
  list($data, $success) = validateData($x, $y, $data);
  if (!$success) {
    print "<script>$data</script>";
    return;
  }

  # Save to file.
  $key = "$x,$y";
  $filename = "tmp/" . $key;
  file_put_contents($filename, json_encode($data));

  # Send to firestore.
  $result = trim(shell_exec("python save.py '$x' '$y' 2>&1"));
  if ($result != 1) {
    die("Error saving. $result");
  }

  print "<script>window.location = 'index.php';</script>";
  return;
}

print <<<EOF
<!doctype html>
<html>
<style>
    body {
        margin: 30px;
        font-family: Arial, Helvetica, sans-serif;
        background-color: #f0f0f0;
    }

    #mycanvas {
        margin-top: 8px;
        border: 1px #000 solid;
        background-color: #fff;
    }
</style>

<body>
    <script>
        let DIMENSION = $DIMENSION;
    </script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <link rel="stylesheet" href="pickr/dist/themes/classic.min.css" />
    <!-- 'classic' theme -->
    <script src="pickr/dist/pickr.min.js"></script>
    <script src="draw.js?version=$VERSION"></script>

    <body>
        <input onclick="window.location='index.php'" value="Back" type=button>
        <BR>
        <BR>
        <table>
            <tr>
                <Td>
                    <div id=picker></div>
                </td>
                <td>
                    <input type=button value="Choose Color" onclick="PICKR.show()" />
                </td>
            </tr>
        </table>
        <div>
            <canvas id=mycanvas width=500 height=500></canvas>
        </div>
        <input id=saveButton type=submit value=Save onclick="save($x, $y)">
        <div id=spinner></div>
    </body>
</html>
EOF;
