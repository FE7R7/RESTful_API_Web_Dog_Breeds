CREATE DATABASE IF NOT EXISTS Dogs_Project;

USE Dogs_Project;

DROP TABLE IF EXISTS `dog_breeds`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `dog_breeds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `breed` VARCHAR(50) DEFAULT NULL,
  `size`  VARCHAR(20) DEFAULT NULL,
  `coat_length` VARCHAR(20) DEFAULT NULL,
  `temperament` VARCHAR(50) DEFAULT NULL,
  `exercise_needs` VARCHAR(50) DEFAULT NULL,
  `color` VARCHAR(50) DEFAULT NULL,
  `grooming_needs` VARCHAR(20) DEFAULT NULL,
  `trainability` VARCHAR(20) DEFAULT NULL,
  `compatibility_with_kids` VARCHAR(20) DEFAULT NULL,
  `intelligence` VARCHAR(20) DEFAULT NULL,
  `picture` VARCHAR(256) DEFAULT NULL,
  `wikipedia` VARCHAR(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4; 

/*!40101 SET character_set_client = @saved_cs_client */;

INSERT INTO dog_breeds (breed, size, coat_length, temperament, exercise_needs, color, grooming_needs, trainability, compatibility_with_kids, intelligence, picture, wikipedia) VALUES
('Labrador Retriever', 'Large', 'Short', 'Friendly', 'High', 'Black, Yellow, Chocolate', 'Low', 'Easy', 'Good', 'High', 'labrador.jpg', 'https://en.wikipedia.org/wiki/Labrador_Retriever'),
('Golden Retriever', 'Large', 'Medium', 'Intelligent', 'High', 'Golden', 'Moderate', 'Easy', 'Good', 'High', 'golden_retriever.jpg', 'https://en.wikipedia.org/wiki/Golden_Retriever'),
('Dachshund', 'Small', 'Short', 'Playful', 'Moderate', 'Red, Chocolate', 'Low', 'Moderate', 'Good', 'Moderate', 'dachshund.jpg', 'https://en.wikipedia.org/wiki/Dachshund'),
('Cocker Spaniel', 'Medium', 'Medium', 'Gentle', 'Moderate', 'Black, Brown, Golden', 'Moderate', 'Easy', 'Good', 'Moderate', 'cocker_spaniel.jpg', 'https://en.wikipedia.org/wiki/Cocker_Spaniel'),
('Bernese Mountain', 'Large', 'Long', 'Gentle', 'Moderate', 'Black, Brown, White', 'Moderate', 'Moderate', 'Good', 'Moderate', 'bernese_mountain.jpg', 'https://en.wikipedia.org/wiki/Bernese_Mountain_Dog'),
('Border Collie', 'Medium', 'Medium', 'Energetic', 'High', 'Coffe and White', 'Moderate', 'Easy', 'Good', 'High', 'border_collie.jpg', 'https://en.wikipedia.org/wiki/Border_Collie'),
('Cavalier King Spaniel', 'Small', 'Medium', 'Affectionate', 'Moderate', 'Blenheim', 'Moderate', 'Easy', 'Good', 'Moderate', 'cavalier_spaniel.jpg', 'https://en.wikipedia.org/wiki/Cavalier_King_Charles_Spaniel');
