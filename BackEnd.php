    <?php
    header('Content-Type: application/json'); // Define o cabeçalho como JSON

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $pedido = json_decode(file_get_contents('php://input'), true); // Recebe os dados JSON

        if (!empty($pedido)) {
            // Salva o pedido em um arquivo de texto
            $data = "Pedido recebido:\n" . implode(", ", $pedido) . "\n\n";
            file_put_contents('pedidos.txt', $data, FILE_APPEND);

            // Retorna uma mensagem de sucesso
            echo json_encode(['status' => 'sucesso', 'mensagem' => 'Pedido registrado com sucesso!']);
        } else {
            // Retorna um erro se o pedido estiver vazio
            echo json_encode(['status' => 'erro', 'mensagem' => 'O pedido está vazio.']);
        }
        exit;
    } else {
        echo json_encode(['status' => 'erro', 'mensagem' => 'Método inválido.']);
    }
    ?>