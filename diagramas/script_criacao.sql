-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: db_ecom
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `entregas`
--

DROP TABLE IF EXISTS `entregas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entregas` (
  `codEntrega` int NOT NULL AUTO_INCREMENT,
  `idPedido` int NOT NULL,
  `cep` varchar(9) NOT NULL,
  `logradouro` varchar(70) NOT NULL,
  `complemento` varchar(100) DEFAULT NULL,
  `bairro` varchar(70) NOT NULL,
  `localidade` varchar(70) NOT NULL,
  `uf` varchar(2) NOT NULL,
  `numero` varchar(12) NOT NULL,
  `statusEntrega` enum('EM_TRANSITO','SAIU_PARA_ENTREGA','ENTREGUE','EXTRAVIADO') NOT NULL DEFAULT 'EM_TRANSITO',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`codEntrega`),
  UNIQUE KEY `idPedido` (`idPedido`),
  CONSTRAINT `entregas_ibfk_1` FOREIGN KEY (`idPedido`) REFERENCES `pedidos` (`codPedido`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entregas`
--

LOCK TABLES `entregas` WRITE;
/*!40000 ALTER TABLE `entregas` DISABLE KEYS */;
INSERT INTO `entregas` VALUES (1,1,'88207-899','Área Rural de Tijucas','casa','Área Rural de Tijucas','Tijucas','SC','90','EM_TRANSITO','2025-12-03 04:24:26','2025-12-03 04:24:26'),(2,2,'88201-304','Avenida Araucária','prédio','Areias','Tijucas','SC','48','EM_TRANSITO','2025-12-03 04:25:08','2025-12-03 04:25:08'),(3,3,'88201-306','Avenida Araucária','fábrica','Areias','Tijucas','SC','219','EM_TRANSITO','2025-12-03 04:25:51','2025-12-03 04:25:51');
/*!40000 ALTER TABLE `entregas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estoques`
--

DROP TABLE IF EXISTS `estoques`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estoques` (
  `codEstoque` int NOT NULL AUTO_INCREMENT,
  `idProduto` int NOT NULL,
  `tipo` enum('ENTRADA','SAIDA') NOT NULL,
  `qtdeMovimento` int NOT NULL DEFAULT '0',
  `quantidade_minima` int DEFAULT '5',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`codEstoque`),
  KEY `idProduto` (`idProduto`),
  CONSTRAINT `estoques_ibfk_1` FOREIGN KEY (`idProduto`) REFERENCES `produtos` (`codProduto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estoques`
--

LOCK TABLES `estoques` WRITE;
/*!40000 ALTER TABLE `estoques` DISABLE KEYS */;
INSERT INTO `estoques` VALUES (1,1,'ENTRADA',50,5,'2025-12-03 04:15:15','2025-12-03 04:15:15'),(2,2,'ENTRADA',100,5,'2025-12-03 04:17:26','2025-12-03 04:17:26'),(3,3,'ENTRADA',150,5,'2025-12-03 04:19:58','2025-12-03 04:19:58'),(4,1,'SAIDA',5,5,'2025-12-03 04:24:03','2025-12-03 04:24:03'),(5,2,'SAIDA',10,5,'2025-12-03 04:24:45','2025-12-03 04:24:45'),(6,3,'SAIDA',15,5,'2025-12-03 04:25:21','2025-12-03 04:25:21');
/*!40000 ALTER TABLE `estoques` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itens_pedidos`
--

DROP TABLE IF EXISTS `itens_pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itens_pedidos` (
  `codItemPedido` int NOT NULL AUTO_INCREMENT,
  `idPedido` int NOT NULL,
  `idProduto` int NOT NULL,
  `quantidade` int NOT NULL DEFAULT '1',
  `precoUnitario` decimal(10,2) NOT NULL,
  `valorTotalItem` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`codItemPedido`),
  UNIQUE KEY `itens_pedidos_id_pedido_id_produto` (`idPedido`,`idProduto`),
  KEY `idProduto` (`idProduto`),
  CONSTRAINT `itens_pedidos_ibfk_1` FOREIGN KEY (`idPedido`) REFERENCES `pedidos` (`codPedido`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `itens_pedidos_ibfk_2` FOREIGN KEY (`idProduto`) REFERENCES `produtos` (`codProduto`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itens_pedidos`
--

LOCK TABLES `itens_pedidos` WRITE;
/*!40000 ALTER TABLE `itens_pedidos` DISABLE KEYS */;
INSERT INTO `itens_pedidos` VALUES (1,1,1,5,5229.00,26145.00),(2,2,2,10,3499.00,34990.00),(3,3,3,15,660.00,9900.00);
/*!40000 ALTER TABLE `itens_pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `codPedido` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `dataPedido` datetime NOT NULL,
  `status` enum('PENDENTE_PAGAMENTO','PAGO','ENVIADO','ENTREGUE','CANCELADO') NOT NULL DEFAULT 'PENDENTE_PAGAMENTO',
  `valorSubtotal` decimal(10,2) NOT NULL DEFAULT '0.00',
  `valorFrete` decimal(10,2) NOT NULL DEFAULT '0.00',
  `valorTotal` decimal(10,2) NOT NULL DEFAULT '0.00',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`codPedido`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`codUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (1,2,'2025-12-03 04:24:03','PENDENTE_PAGAMENTO',26145.00,0.00,26145.00,'2025-12-03 04:24:03','2025-12-03 04:24:03'),(2,2,'2025-12-03 04:24:45','PENDENTE_PAGAMENTO',34990.00,0.00,34990.00,'2025-12-03 04:24:45','2025-12-03 04:24:45'),(3,2,'2025-12-03 04:25:21','PENDENTE_PAGAMENTO',9900.00,0.00,9900.00,'2025-12-03 04:25:21','2025-12-03 04:25:21');
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `codProduto` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(300) DEFAULT NULL,
  `modelo` varchar(50) NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `estoque` int DEFAULT '0',
  `imagem_url` text,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`codProduto`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (1,'Rodas BBS','MARCA: NOOVA MODELO: NV47 BALLINA BBS FURAÇÃO: 4X100 VW TALA: 6 POLEGADAS COR: PRATA COM BORDA DIAMANTADA','Aro 18',5229.00,45,'https://http2.mlstatic.com/D_NQ_NP_2X_959101-MLB93219058923_092025-F.webp',1,'2025-12-03 04:14:49','2025-12-03 04:24:03'),(2,'Bancos Recaro','2 BANCOS DIANTEIROS RECARO. MUITO CONFORTAVEIS!','98765432X',3499.00,90,'https://http2.mlstatic.com/D_NQ_NP_2X_814156-MLB91917230342_092025-F.webp',1,'2025-12-03 04:16:43','2025-12-03 04:24:45'),(3,'Subwoofer Pioneer 1600w','O subwoofer Pioneer TS-W312S4 é um sistema de som de alta qualidade','12 polegadas',660.00,135,'https://http2.mlstatic.com/D_NQ_NP_2X_921566-MLA99336345402_112025-F.webp',1,'2025-12-03 04:19:36','2025-12-03 04:25:21');
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `codUsuario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(80) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `identidade` varchar(20) DEFAULT NULL,
  `tipo_usuario` enum('CLIENTE','ADMIN') NOT NULL DEFAULT 'CLIENTE',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`codUsuario`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `cpf` (`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Marcos','marcos@gmail.com','$2b$10$Bd49LLF8Cxo7eOu1gDzA6.DDuIuHT2d9lKsymEkbfL6zNQeCjq.B2','(12) 99656-6764','89471407087','','ADMIN','2025-12-03 04:12:21','2025-12-03 04:12:21'),(2,'Isak','isak@gmail.com','$2b$10$aOfOrttpEfhyin6X3unFXOc7ZGn1CA3a/awiivWStCEfAc5BVkiB6','83995692644','109.474.720-37','','CLIENTE','2025-12-03 04:21:27','2025-12-03 04:21:27'),(3,'Leonardo','leonardo@gmail.com','$2b$10$Tn0O67QeFBZaW.QAe6aZ0O0kqH1OSUipgjV5wVs22CkyIPJNZgZWy','(61) 99464-1332','99763236037','358898213','CLIENTE','2025-12-03 04:22:47','2025-12-03 04:22:47');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-03  1:27:37
