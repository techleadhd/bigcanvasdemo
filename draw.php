<?php
require_once 'global.php';
require_once 'validate.php';

$x = intval($_REQUEST['x']);
$y = intval($_REQUEST['y']);

if ($_REQUEST['submit']) {
  $data = $_POST['data'];

  # Validate data
  list($data, $success) = validateData($x, $y, $data);
  # list($data, $success) = array($data, 1);

  if (!$success) {
    print "<script>$data</script>";
    return;
  }

  # Save to file.
  $key = "$x,$y";
  $filename = "tmp/" . $key . '-' . rand()%100;
  file_put_contents($filename, json_encode($data));

  # Send to firestore.
  $result = trim(shell_exec("python save.py '$x' '$y' '$filename' 2>&1"));
  if ($result != 1) {
    die("Error saving. $result<HR>");
  }

  print "<script>window.location = 'index.php';</script>";
  return;
}

print <<<EOF
<!doctype html>
<html>
<body>
    <script>
        let DIMENSION = $DIMENSION;
    </script>
    <link rel="stylesheet" type="text/css" href="index.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <link rel="stylesheet" href="pickr/dist/themes/classic.min.css" />
    <!-- 'classic' theme -->
    <script src="pickr/dist/pickr.min.js"></script>
    <script src="draw.js?version=$VERSION"></script>

    <body>
        <div class="headbar">
            <br>
            <h2>
                Big Canvas Demo
            </h2>
            <br>
        </div>
        <br>
        <input onclick="window.location='index.php'" value="Back" type=button style="margin-left: 20pt;">
        <br>
        <br>
        <br>
        <center>
            <div>
                <canvas id=mycanvas width=500 height=500 style="float: left; margin-left: 50pt;"></canvas>
            </div>
            <table>
                <tr>
                    <Td>
                        <div id=picker></div>
                    </td>
                    <td>
                        <input id="chose_color" type=button value="Choose Color" onclick="PICKR.show()"  style="margin-top: 100pt;"/>
                    </td>
                </tr>
            </table>
            <br>
            <input id=saveButton type=submit value=Save onclick="save($x, $y)">
            <div id=spinner></div>
        </center>
    </body>
</html>
EOF;
