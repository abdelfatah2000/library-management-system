INSERT INTO categories (name) VALUES
  ('Classic Literature'),
  ('Contemporary Fiction'),
  ('Science Fiction'),
  ('Mystery & Thriller'),
  ('Non-Fiction'),
  ('Fantasy'),
  ('Biography'),
  ('Science'),
  ('Philosophy'),
  ('Historical Fiction'),
  ('Poetry'),
  ('Drama'),
  ('Romance'),
  ('Horror'),
  ('Literary Fiction'),
  ('Young Adult'),
  ('Crime Fiction'),
  ('Contemporary Literature'),
  ('Dystopian Fiction'),
  ('Arabic Literature'),
  ('Arabic Poetry'),
  ('Arabic Philosophy'),
  ('Modern Arabic Fiction');


-- Insert real authors with their biographies
INSERT INTO authors (name, biography) VALUES
  ('George Orwell', 'English novelist and essayist. Born in 1903, died in 1950. Known for his works addressing social injustice and opposition to totalitarianism.'),
  ('J.K. Rowling', 'British author born in 1965, best known for creating the Harry Potter series. Also writes crime fiction under the pen name Robert Galbraith.'),
  ('Stephen King', 'American author of horror, supernatural fiction, suspense, and fantasy novels. Born in 1947, has sold more than 350 million books.'),
  ('Virginia Woolf', 'English writer, considered one of the most important modernist 20th-century authors. Born in 1882, died in 1941.'),
  ('Haruki Murakami', 'Japanese writer born in 1949. His works are characterized by a blend of magical realism and pop culture references.'),
  ('Margaret Atwood', 'Canadian poet and novelist born in 1939. Known for works exploring gender, identity, and environmental issues.'),
  ('Neil Gaiman', 'English author born in 1960, known for his fantasy and comic book writing.'),
  ('George R.R. Martin', 'American novelist born in 1948, author of the epic fantasy series A Song of Ice and Fire.'),
  ('Agatha Christie', 'British mystery writer (1890-1976), best-selling novelist of all time with over 2 billion copies sold.'),
  ('Ernest Hemingway', 'American novelist and short story writer (1899-1961). Known for his economical and understated style.'),
  ('Jane Austen', 'English novelist known for her romantic fiction and social commentary. Born 1775, died 1817.'),
  ('Charles Dickens', 'Victorian era novelist known for his vivid characters and social criticism. Born 1812, died 1870.'),
  ('Fyodor Dostoevsky', 'Russian novelist, philosopher and journalist. Born 1821, died 1881.'),
  ('James Joyce', 'Irish novelist and poet, leading modernist writer. Born 1882, died 1941.'),
  ('Franz Kafka', 'German-speaking Bohemian novelist and short story writer. Born 1883, died 1924.'),
  ('Gabriel García Márquez', 'Colombian novelist known for magical realism. Born 1927, died 2014.'),
  ('Toni Morrison', 'American novelist and Nobel Prize winner. Born 1931, died 2019.'),
  ('William Shakespeare', 'English playwright and poet. Born 1564, died 1616.'),
  ('Emily Dickinson', 'American poet. Born 1830, died 1886.'),
  ('Arthur Conan Doyle', 'British writer, creator of Sherlock Holmes. Born 1859, died 1930.'),
  ('Oscar Wilde', 'Irish poet and playwright. Born 1854, died 1900.'),
  ('Mary Shelley', 'English novelist, author of Frankenstein. Born 1797, died 1851.'),
  ('Leo Tolstoy', 'Russian writer known for his realistic fiction. Born 1828, died 1910.'),
  ('Edgar Allan Poe', 'American writer known for mystery and macabre. Born 1809, died 1849.'),
  ('Mark Twain', 'American writer, humorist and entrepreneur. Born 1835, died 1910.'),
  ('Frank Herbert', 'American science fiction author, best known for the Dune saga. Born 1920, died 1986. His masterwork Dune is considered the best-selling science fiction novel of all time.'),
  ('Andy Weir', 'American novelist known for his technically accurate science fiction. Born 1972. Former computer programmer who wrote The Martian as a web serial.'),
  ('Suzanne Collins', 'American author of The Hunger Games trilogy. Born 1962. Started as a television writer for children''s shows.'),
  ('Gillian Flynn', 'American author known for psychological thrillers. Born 1971. Former television critic for Entertainment Weekly.'),
  ('John Green', 'American author of young adult fiction. Born 1977. Known for his online educational content and bestselling novels.'),
  ('Diana Gabaldon', 'American author of the Outlander series. Born 1952. Has a PhD in Quantitative Behavioral Ecology.'),
  ('Sally Rooney', 'Irish author known for her millennial novels. Born 1991. Her works explore modern relationships and social dynamics.'),
  ('Stieg Larsson', 'Swedish journalist and writer. Born 1954, died 2004. Created the Millennium series, published posthumously.'),
  ('Walter Tevis', 'American novelist. Born 1928, died 1984. Wrote The Queen''s Gambit and other works adapted into acclaimed productions.'),
  ('Min Jin Lee', 'Korean American author. Born 1968. Known for her multi-generational stories about the Korean diaspora.'),
  ('Naguib Mahfouz', 'Egyptian writer who won the 1988 Nobel Prize in Literature. Born 1911, died 2006. The first Arabic-language writer to win the Nobel Prize.'),
  ('Taha Hussein', 'Egyptian writer and intellectual, known as the Dean of Arabic Literature. Born 1889, died 1973. Pioneer of the Arab literary renaissance.'),
  ('Gibran Khalil Gibran', 'Lebanese-American writer, poet, and artist. Born 1883, died 1931. Best known for The Prophet and his mystical Arabic and English writings.'),
  ('Ahlam Mosteghanemi', 'Algerian novelist writing in Arabic. Born 1953. First Algerian woman to publish a work in English.'),
  ('Ghassan Kanafani', 'Palestinian writer and political activist. Born 1936, died 1972. Major figure in modern Arabic literature.'),
  ('Nawal El Saadawi', 'Egyptian feminist writer, activist and physician. Born 1931, died 2021. Known for her powerful works on women in Arab society.'),
  ('Mahmoud Darwish', 'Palestinian poet and author. Born 1941, died 2008. Regarded as the Palestinian national poet.'),
  ('Tayeb Salih', 'Sudanese writer. Born 1929, died 2009. Author of Season of Migration to the North, considered one of the most important Arab novels.'),
  ('Adonis', 'Syrian poet and essayist. Born 1930. Pioneer of modern Arabic poetry and multiple-time Nobel Prize nominee.'),
  ('Yusuf Idris', 'Egyptian playwright and short story writer. Born 1927, died 1991. Master of the Arabic short story.');

-- Insert real books
INSERT INTO books (title, author_id, published_at, isbn, status, category_id) VALUES
  -- George Orwell's books
  ('1984', 1, '1949-06-08', '9780451524935', 'available', 1),
  ('Animal Farm', 1, '1945-08-17', '9780452284241', 'loaned', 1),
  ('Homage to Catalonia', 1, '1938-04-25', '9780156421171', 'available', 5),

  -- J.K. Rowling's books
  ('Harry Potter and the Philosopher''s Stone', 2, '1997-06-26', '9780747532699', 'available', 6),
  ('Harry Potter and the Chamber of Secrets', 2, '1998-07-02', '9780439064873', 'loaned', 6),
  ('Harry Potter and the Prisoner of Azkaban', 2, '1999-07-08', '9780439136358', 'available', 6),
  ('Harry Potter and the Goblet of Fire', 2, '2000-07-08', '9780439139595', 'loaned', 6),
  ('Harry Potter and the Order of the Phoenix', 2, '2003-06-21', '9780439358071', 'available', 6),
  ('Harry Potter and the Half-Blood Prince', 2, '2005-07-16', '9780439785969', 'available', 6),
  ('Harry Potter and the Deathly Hallows', 2, '2007-07-21', '9780545139700', 'loaned', 6),

  -- Stephen King's books
  ('The Shining', 3, '1977-01-28', '9780307743657', 'available', 4),
  ('The Stand', 3, '1978-10-03', '9780307743688', 'loaned', 4),
  ('It', 3, '1986-09-15', '9781444707861', 'available', 4),
  ('Pet Sematary', 3, '1983-11-14', '9781476794341', 'available', 4),
  ('The Green Mile', 3, '1996-08-29', '9780671041786', 'loaned', 4),

  -- Virginia Woolf's books
  ('Mrs Dalloway', 4, '1925-05-14', '9780156628709', 'available', 1),
  ('To the Lighthouse', 4, '1927-05-05', '9780156907392', 'available', 1),
  ('Orlando', 4, '1928-10-11', '9780156701600', 'loaned', 1),
  ('A Room of One''s Own', 4, '1929-10-24', '9780156787338', 'available', 9),

  -- Haruki Murakami's books
  ('Norwegian Wood', 5, '1987-08-04', '9780375704024', 'available', 2),
  ('The Wind-Up Bird Chronicle', 5, '1994-04-12', '9780679775430', 'loaned', 2),
  ('Kafka on the Shore', 5, '2002-09-12', '9781400079278', 'available', 2),
  ('1Q84', 5, '2009-05-29', '9780307593313', 'available', 2),

  -- Margaret Atwood's books
  ('The Handmaid''s Tale', 6, '1985-06-14', '9780385490818', 'available', 3),
  ('The Blind Assassin', 6, '2000-09-05', '9780385720953', 'loaned', 2),
  ('Oryx and Crake', 6, '2003-05-06', '9780385721677', 'available', 3),
  ('The Testaments', 6, '2019-09-10', '9780385543781', 'available', 3),

  -- Neil Gaiman's books
  ('American Gods', 7, '2001-06-19', '9780380789030', 'available', 6),
  ('Coraline', 7, '2002-07-02', '9780380807345', 'loaned', 6),
  ('The Graveyard Book', 7, '2008-09-30', '9780060530922', 'available', 6),
  ('Good Omens', 7, '1990-05-01', '9780060853976', 'available', 6),

  -- George R.R. Martin's books
  ('A Game of Thrones', 8, '1996-08-06', '9780553103540', 'available', 6),
  ('A Clash of Kings', 8, '1998-11-16', '9780553108033', 'loaned', 6),
  ('A Storm of Swords', 8, '2000-08-08', '9780553106633', 'available', 6),
  ('A Feast for Crows', 8, '2005-10-17', '9780553801507', 'available', 6),
  ('A Dance with Dragons', 8, '2011-07-12', '9780553801477', 'loaned', 6),

  -- Agatha Christie's books
  ('Murder on the Orient Express', 9, '1934-01-01', '9780007119318', 'available', 4),
  ('Death on the Nile', 9, '1937-11-01', '9780062073556', 'loaned', 4),
  ('And Then There Were None', 9, '1939-11-06', '9780062073470', 'available', 4),
  ('The ABC Murders', 9, '1936-01-06', '9780062073587', 'available', 4),

  -- Ernest Hemingway's books
  ('The Old Man and the Sea', 10, '1952-09-01', '9780684801223', 'available', 1),
  ('For Whom the Bell Tolls', 10, '1940-10-21', '9780684803357', 'loaned', 1),
  ('The Sun Also Rises', 10, '1926-10-22', '9780743297332', 'available', 1),
  ('A Farewell to Arms', 10, '1929-09-27', '9780684801469', 'available', 1),
  ('Pride and Prejudice', (SELECT id FROM authors WHERE name = 'Jane Austen'), '1813-01-28', '9780141439518', 'available', 1),
  ('Sense and Sensibility', (SELECT id FROM authors WHERE name = 'Jane Austen'), '1811-10-30', '9780141439662', 'loaned', 1),
  ('Emma', (SELECT id FROM authors WHERE name = 'Jane Austen'), '1815-12-23', '9780141439587', 'available', 1),
  ('Mansfield Park', (SELECT id FROM authors WHERE name = 'Jane Austen'), '1814-07-01', '9780141439808', 'available', 1),

  -- Charles Dickens' books
  ('Great Expectations', (SELECT id FROM authors WHERE name = 'Charles Dickens'), '1861-08-01', '9780141439563', 'available', 1),
  ('Oliver Twist', (SELECT id FROM authors WHERE name = 'Charles Dickens'), '1837-02-01', '9780141439747', 'loaned', 1),
  ('A Tale of Two Cities', (SELECT id FROM authors WHERE name = 'Charles Dickens'), '1859-04-30', '9780141439600', 'available', 1),
  ('David Copperfield', (SELECT id FROM authors WHERE name = 'Charles Dickens'), '1850-05-01', '9780140439441', 'unavailable', 1),

  -- Fyodor Dostoevsky's books
  ('Crime and Punishment', (SELECT id FROM authors WHERE name = 'Fyodor Dostoevsky'), '1866-01-01', '9780140449136', 'available', 1),
  ('The Brothers Karamazov', (SELECT id FROM authors WHERE name = 'Fyodor Dostoevsky'), '1880-01-01', '9780140449242', 'loaned', 1),
  ('Notes from Underground', (SELECT id FROM authors WHERE name = 'Fyodor Dostoevsky'), '1864-01-01', '9780679734529', 'available', 1),

  -- James Joyce's books
  ('Ulysses', (SELECT id FROM authors WHERE name = 'James Joyce'), '1922-02-02', '9780679722762', 'available', 1),
  ('Dubliners', (SELECT id FROM authors WHERE name = 'James Joyce'), '1914-06-15', '9780140186475', 'loaned', 1),
  ('Portrait of the Artist as a Young Man', (SELECT id FROM authors WHERE name = 'James Joyce'), '1916-12-29', '9780142437346', 'available', 1),

  -- Franz Kafka's books
  ('The Metamorphosis', (SELECT id FROM authors WHERE name = 'Franz Kafka'), '1915-01-01', '9780141197562', 'available', 1),
  ('The Trial', (SELECT id FROM authors WHERE name = 'Franz Kafka'), '1925-01-01', '9780805209990', 'loaned', 1),
  ('The Castle', (SELECT id FROM authors WHERE name = 'Franz Kafka'), '1926-01-01', '9780805211061', 'available', 1),

  -- Gabriel García Márquez's books
  ('One Hundred Years of Solitude', (SELECT id FROM authors WHERE name = 'Gabriel García Márquez'), '1967-05-30', '9780060883287', 'available', 2),
  ('Love in the Time of Cholera', (SELECT id FROM authors WHERE name = 'Gabriel García Márquez'), '1985-01-01', '9780307389732', 'loaned', 2),
  ('Chronicle of a Death Foretold', (SELECT id FROM authors WHERE name = 'Gabriel García Márquez'), '1981-01-01', '9781400034710', 'available', 2),

  -- Toni Morrison's books
  ('Beloved', (SELECT id FROM authors WHERE name = 'Toni Morrison'), '1987-09-02', '9781400033416', 'available', 2),
  ('Song of Solomon', (SELECT id FROM authors WHERE name = 'Toni Morrison'), '1977-01-01', '9781400033423', 'loaned', 2),
  ('The Bluest Eye', (SELECT id FROM authors WHERE name = 'Toni Morrison'), '1970-01-01', '9780452282193', 'available', 2),

  -- William Shakespeare's plays
  ('Hamlet', (SELECT id FROM authors WHERE name = 'William Shakespeare'), '1603-01-01', '9780743477123', 'available', 12),
  ('Macbeth', (SELECT id FROM authors WHERE name = 'William Shakespeare'), '1606-01-01', '9780743477109', 'loaned', 12),
  ('Romeo and Juliet', (SELECT id FROM authors WHERE name = 'William Shakespeare'), '1597-01-01', '9780743477116', 'available', 12),
  ('King Lear', (SELECT id FROM authors WHERE name = 'William Shakespeare'), '1606-01-01', '9780743482769', 'available', 12),

  -- Emily Dickinson's poetry collections
  ('Complete Poems', (SELECT id FROM authors WHERE name = 'Emily Dickinson'), '1890-01-01', '9780316184137', 'available', 11),
  ('Selected Poems', (SELECT id FROM authors WHERE name = 'Emily Dickinson'), '1890-01-01', '9780674018242', 'loaned', 11),

  -- Arthur Conan Doyle's books
  ('The Adventures of Sherlock Holmes', (SELECT id FROM authors WHERE name = 'Arthur Conan Doyle'), '1892-10-14', '9780143117025', 'available', 4),
  ('The Hound of the Baskervilles', (SELECT id FROM authors WHERE name = 'Arthur Conan Doyle'), '1902-04-01', '9780451528018', 'loaned', 4),
  ('A Study in Scarlet', (SELECT id FROM authors WHERE name = 'Arthur Conan Doyle'), '1887-01-01', '9780140439083', 'available', 4),

  -- Oscar Wilde's books
  ('The Picture of Dorian Gray', (SELECT id FROM authors WHERE name = 'Oscar Wilde'), '1890-07-01', '9780141439570', 'available', 1),
  ('The Importance of Being Earnest', (SELECT id FROM authors WHERE name = 'Oscar Wilde'), '1895-02-14', '9780140436068', 'loaned', 12),
  ('Lady Windermere''s Fan', (SELECT id FROM authors WHERE name = 'Oscar Wilde'), '1892-02-20', '9780486400789', 'available', 12),

  -- Mary Shelley's books
  ('Frankenstein', (SELECT id FROM authors WHERE name = 'Mary Shelley'), '1818-01-01', '9780141439471', 'available', 14),
  ('The Last Man', (SELECT id FROM authors WHERE name = 'Mary Shelley'), '1826-01-01', '9780199552351', 'loaned', 3),
  ('Mathilda', (SELECT id FROM authors WHERE name = 'Mary Shelley'), '1819-01-01', '9781101973837', 'available', 1),

  -- Leo Tolstoy's books
  ('War and Peace', (SELECT id FROM authors WHERE name = 'Leo Tolstoy'), '1869-01-01', '9780140447934', 'available', 1),
  ('Anna Karenina', (SELECT id FROM authors WHERE name = 'Leo Tolstoy'), '1877-01-01', '9780143035008', 'loaned', 1),
  ('The Death of Ivan Ilyich', (SELECT id FROM authors WHERE name = 'Leo Tolstoy'), '1886-01-01', '9780307951335', 'available', 1),

  -- Edgar Allan Poe's works
  ('The Raven and Other Poems', (SELECT id FROM authors WHERE name = 'Edgar Allan Poe'), '1845-01-01', '9780143122364', 'available', 11),
  ('The Tell-Tale Heart', (SELECT id FROM authors WHERE name = 'Edgar Allan Poe'), '1843-01-01', '9780141397269', 'loaned', 14),
  ('The Fall of the House of Usher', (SELECT id FROM authors WHERE name = 'Edgar Allan Poe'), '1839-01-01', '9780141397047', 'available', 14),

  -- Mark Twain's books
  ('The Adventures of Tom Sawyer', (SELECT id FROM authors WHERE name = 'Mark Twain'), '1876-01-01', '9780143039563', 'available', 1),
  ('Adventures of Huckleberry Finn', (SELECT id FROM authors WHERE name = 'Mark Twain'), '1884-12-10', '9780142437179', 'loaned', 1),
  ('The Prince and the Pauper', (SELECT id FROM authors WHERE name = 'Mark Twain'), '1881-01-01', '9780140436693', 'available', 1),
  ('Dune', (SELECT id FROM authors WHERE name = 'Frank Herbert'), '1965-08-01', '9780441172719', 'available', 3),
  ('Dune Messiah', (SELECT id FROM authors WHERE name = 'Frank Herbert'), '1969-01-01', '9780441172696', 'loaned', 3),
  
  -- The Martian (Movie)
  ('The Martian', (SELECT id FROM authors WHERE name = 'Andy Weir'), '2011-09-27', '9780553418026', 'available', 3),
  ('Project Hail Mary', (SELECT id FROM authors WHERE name = 'Andy Weir'), '2021-05-04', '9780593135204', 'loaned', 3),
  
  -- The Hunger Games Series (Movies)
  ('The Hunger Games', (SELECT id FROM authors WHERE name = 'Suzanne Collins'), '2008-09-14', '9780439023481', 'available', 16),
  ('Catching Fire', (SELECT id FROM authors WHERE name = 'Suzanne Collins'), '2009-09-01', '9780439023498', 'loaned', 16),
  ('Mockingjay', (SELECT id FROM authors WHERE name = 'Suzanne Collins'), '2010-08-24', '9780439023511', 'available', 16),
  ('The Ballad of Songbirds and Snakes', (SELECT id FROM authors WHERE name = 'Suzanne Collins'), '2020-05-19', '9781338635171', 'available', 16),
  
  -- Gillian Flynn's Adaptations
  ('Gone Girl', (SELECT id FROM authors WHERE name = 'Gillian Flynn'), '2012-06-05', '9780307588371', 'available', 17),
  ('Sharp Objects', (SELECT id FROM authors WHERE name = 'Gillian Flynn'), '2006-09-26', '9780307341556', 'loaned', 17),
  ('Dark Places', (SELECT id FROM authors WHERE name = 'Gillian Flynn'), '2009-05-05', '9780307341568', 'available', 17),
  
  -- John Green Adaptations
  ('The Fault in Our Stars', (SELECT id FROM authors WHERE name = 'John Green'), '2012-01-10', '9780525478812', 'available', 16),
  ('Looking for Alaska', (SELECT id FROM authors WHERE name = 'John Green'), '2005-03-03', '9780525475064', 'loaned', 16),
  ('Paper Towns', (SELECT id FROM authors WHERE name = 'John Green'), '2008-10-16', '9780525478188', 'available', 16),
  
  -- Outlander Series
  ('Outlander', (SELECT id FROM authors WHERE name = 'Diana Gabaldon'), '1991-06-01', '9780440212560', 'available', 10),
  ('Dragonfly in Amber', (SELECT id FROM authors WHERE name = 'Diana Gabaldon'), '1992-07-01', '9780440215622', 'loaned', 10),
  ('Voyager', (SELECT id FROM authors WHERE name = 'Diana Gabaldon'), '1993-12-01', '9780440217565', 'available', 10),
  ('Drums of Autumn', (SELECT id FROM authors WHERE name = 'Diana Gabaldon'), '1996-12-30', '9780440222859', 'available', 10),
  
  -- Sally Rooney Adaptations
  ('Normal People', (SELECT id FROM authors WHERE name = 'Sally Rooney'), '2018-08-28', '9781984822178', 'available', 18),
  ('Conversations with Friends', (SELECT id FROM authors WHERE name = 'Sally Rooney'), '2017-05-25', '9780451499066', 'loaned', 18),
  
  -- Millennium Series
  ('The Girl with the Dragon Tattoo', (SELECT id FROM authors WHERE name = 'Stieg Larsson'), '2005-08-01', '9780307454546', 'available', 17),
  ('The Girl Who Played with Fire', (SELECT id FROM authors WHERE name = 'Stieg Larsson'), '2006-06-01', '9780307454553', 'loaned', 17),
  ('The Girl Who Kicked the Hornets'' Nest', (SELECT id FROM authors WHERE name = 'Stieg Larsson'), '2007-05-01', '9780307454560', 'available', 17),
  
  -- Walter Tevis Adaptations
  ('The Queen''s Gambit', (SELECT id FROM authors WHERE name = 'Walter Tevis'), '1983-03-01', '9781400030606', 'available', 18),
  ('The Man Who Fell to Earth', (SELECT id FROM authors WHERE name = 'Walter Tevis'), '1963-01-01', '9780486476872', 'loaned', 3),
  
  -- Min Jin Lee
  ('Pachinko', (SELECT id FROM authors WHERE name = 'Min Jin Lee'), '2017-02-07', '9781455563937', 'available', 18),
  ('The Cairo Trilogy: Palace Walk', (SELECT id FROM authors WHERE name = 'Naguib Mahfouz'), '1956-01-01', '9789774246968', 'available', 20),
  ('Children of Gebelawi', (SELECT id FROM authors WHERE name = 'Naguib Mahfouz'), '1959-01-01', '9780385264730', 'loaned', 20),
  ('Midaq Alley', (SELECT id FROM authors WHERE name = 'Naguib Mahfouz'), '1947-01-01', '9780385264761', 'available', 20),
  ('The Harafish', (SELECT id FROM authors WHERE name = 'Naguib Mahfouz'), '1977-01-01', '9789774248870', 'available', 20),

  -- Taha Hussein's works
  ('The Days', (SELECT id FROM authors WHERE name = 'Taha Hussein'), '1929-01-01', '9789774248757', 'available', 20),
  ('The Call of the Curlew', (SELECT id FROM authors WHERE name = 'Taha Hussein'), '1934-01-01', '9789774167293', 'loaned', 20),
  ('The Future of Culture in Egypt', (SELECT id FROM authors WHERE name = 'Taha Hussein'), '1938-01-01', '9789774245318', 'available', 22),

  -- Gibran Khalil Gibran's works
  ('The Prophet', (SELECT id FROM authors WHERE name = 'Gibran Khalil Gibran'), '1923-01-01', '9780394404288', 'available', 21),
  ('The Broken Wings', (SELECT id FROM authors WHERE name = 'Gibran Khalil Gibran'), '1912-01-01', '9781946451767', 'loaned', 20),
  ('The Garden of the Prophet', (SELECT id FROM authors WHERE name = 'Gibran Khalil Gibran'), '1933-01-01', '9780394432808', 'available', 21),

  -- Ahlam Mosteghanemi's works
  ('Memory in the Flesh', (SELECT id FROM authors WHERE name = 'Ahlam Mosteghanemi'), '1985-01-01', '9789774248788', 'available', 23),
  ('Chaos of the Senses', (SELECT id FROM authors WHERE name = 'Ahlam Mosteghanemi'), '1997-01-01', '9789774167447', 'loaned', 23),
  ('The Art of Forgetting', (SELECT id FROM authors WHERE name = 'Ahlam Mosteghanemi'), '2009-01-01', '9789774167430', 'available', 23),

  -- Ghassan Kanafani's works
  ('Men in the Sun', (SELECT id FROM authors WHERE name = 'Ghassan Kanafani'), '1963-01-01', '9780894108570', 'available', 20),
  ('Return to Haifa', (SELECT id FROM authors WHERE name = 'Ghassan Kanafani'), '1969-01-01', '9780894108594', 'loaned', 20),
  ('All That''s Left to You', (SELECT id FROM authors WHERE name = 'Ghassan Kanafani'), '1966-01-01', '9780894108587', 'available', 20),

  -- Nawal El Saadawi's works
  ('Woman at Point Zero', (SELECT id FROM authors WHERE name = 'Nawal El Saadawi'), '1975-01-01', '9781783605941', 'available', 23),
  ('The Hidden Face of Eve', (SELECT id FROM authors WHERE name = 'Nawal El Saadawi'), '1977-01-01', '9781783605958', 'loaned', 23),
  ('Memoirs from the Women''s Prison', (SELECT id FROM authors WHERE name = 'Nawal El Saadawi'), '1983-01-01', '9780520088887', 'available', 23),

  -- Mahmoud Darwish's works
  ('Unfortunately, It Was Paradise', (SELECT id FROM authors WHERE name = 'Mahmoud Darwish'), '2003-01-01', '9780520237544', 'available', 21),
  ('Memory for Forgetfulness', (SELECT id FROM authors WHERE name = 'Mahmoud Darwish'), '1986-01-01', '9780520273047', 'loaned', 21),
  ('The Butterfly''s Burden', (SELECT id FROM authors WHERE name = 'Mahmoud Darwish'), '2007-01-01', '9781556592416', 'available', 21),

  -- Tayeb Salih's works
  ('Season of Migration to the North', (SELECT id FROM authors WHERE name = 'Tayeb Salih'), '1966-01-01', '9780435900311', 'available', 20),
  ('The Wedding of Zein', (SELECT id FROM authors WHERE name = 'Tayeb Salih'), '1962-01-01', '9789774167593', 'loaned', 20),
  ('Bandarshah', (SELECT id FROM authors WHERE name = 'Tayeb Salih'), '1971-01-01', '9780894108600', 'available', 20),

  -- Adonis's works
  ('Songs of Mihyar the Damascene', (SELECT id FROM authors WHERE name = 'Adonis'), '1961-01-01', '9780892552740', 'available', 21),
  ('The Pages of Day and Night', (SELECT id FROM authors WHERE name = 'Adonis'), '1994-01-01', '9780810160126', 'loaned', 21),
  ('Selected Poems', (SELECT id FROM authors WHERE name = 'Adonis'), '2010-01-01', '9780300153066', 'available', 21),

  -- Yusuf Idris's works
  ('The Cheapest Nights', (SELECT id FROM authors WHERE name = 'Yusuf Idris'), '1954-01-01', '9789774248214', 'available', 20),
  ('City of Love and Ashes', (SELECT id FROM authors WHERE name = 'Yusuf Idris'), '1956-01-01', '9789774167461', 'loaned', 20),
  ('The Sin', (SELECT id FROM authors WHERE name = 'Yusuf Idris'), '1959-01-01', '9789774166724', 'available', 20);



INSERT INTO members (name, email, phone, is_verified) VALUES
('John Smith', 'john.smith@email.com', '12345678901', true),
('Sarah Johnson', 'sarah.j@email.com', '23456789012', true),
('Michael Brown', 'michael.b@email.com', '34567890123', true),
('Emma Wilson', 'emma.w@email.com', '45678901234', false),
('James Davis', 'james.d@email.com', '56789012345', true),
('Lisa Anderson', 'lisa.a@email.com', '67890123456', true),
('David Miller', 'david.m@email.com', '78901234567', false),
('Jennifer Lee', 'jennifer.l@email.com', '89012345678', true),
('Robert Taylor', 'robert.t@email.com', '90123456789', true),
('Maria Garcia', 'maria.g@email.com', '01234567890', true),
('Thomas Wright', 'thomas.w@email.com', '11223344556', true),
('Patricia Moore', 'patricia.m@email.com', '22334455667', false),
('Kevin Martinez', 'kevin.m@email.com', '33445566778', true),
('Nancy Rodriguez', 'nancy.r@email.com', '44556677889', true),
('Christopher Lee', 'chris.l@email.com', '55667788990', true),
('Amanda White', 'amanda.w@email.com', '66778899001', false),
('Daniel Clark', 'daniel.c@email.com', '77889900112', true),
('Michelle Scott', 'michelle.s@email.com', '88990011223', true),
('Ryan Adams', 'ryan.a@email.com', '99001122334', true),
('Laura Hall', 'laura.h@email.com', '00112233445', false),
('Steven King', 'steven.k@email.com', '11224455667', true),
('Karen Young', 'karen.y@email.com', '22334455668', true),
('Edward Baker', 'edward.b@email.com', '33445566779', true),
('Sandra Nelson', 'sandra.n@email.com', '44556677880', false),
('George Turner', 'george.t@email.com', '55667788991', true);


INSERT INTO staff (name, email, phone, password, role_id) VALUES
('Alice Cooper', 'alice.c@library.com', '11111111111', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/vC5k/3y', 1),  -- Admin
('Bob Wilson', 'bob.w@library.com', '22222222222', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/vC5k/3y', 2),   -- Librarian
('Carol White', 'carol.w@library.com', '33333333333', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/vC5k/3y', 1),  -- Admin
('David Brown', 'david.b@library.com', '44444444444', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/vC5k/3y', 2),  -- Librarian
('Elena Rodriguez', 'elena.r@library.com', '55555555555', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/vC5k/3y', 2), -- Librarian
('Frank Johnson', 'frank.j@library.com', '66666666666', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/vC5k/3y', 2),  -- Librarian
('Grace Liu', 'grace.l@library.com', '77777777777', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/vC5k/3y', 2),    -- Librarian
('Henry Garcia', 'henry.g@library.com', '88888888888', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/vC5k/3y', 2),  -- Librarian
('Isabella Chen', 'isabella.c@library.com', '99999999999', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/vC5k/3y', 1), -- Admin
('Jack Thompson', 'jack.t@library.com', '10101010101', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/vC5k/3y', 2),   -- Librarian
('Katherine Lee', 'katherine.l@library.com', '12121212121', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/vC5k/3y', 2), -- Librarian
('Lucas Martin', 'lucas.m@library.com', '13131313131', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/vC5k/3y', 2),   -- Librarian
('Maria Sanchez', 'maria.s@library.com', '14141414141', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/vC5k/3y', 1),  -- Admin
('Noah Williams', 'noah.w@library.com', '15151515151', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/vC5k/3y', 2),   -- Librarian
('Olivia Taylor', 'olivia.t@library.com', '16161616161', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/vC5k/3y', 2);  -- Librarian

-- Insert loans
INSERT INTO loans (member_id, staff_id, book_id, due_date, return_date) VALUES
(1, 1, 1, CURRENT_TIMESTAMP + INTERVAL '14 days', NULL),
(2, 2, 2, CURRENT_TIMESTAMP + INTERVAL '14 days', CURRENT_TIMESTAMP + INTERVAL '10 days'),
(3, 1, 3, CURRENT_TIMESTAMP + INTERVAL '14 days', NULL),
(4, 3, 4, CURRENT_TIMESTAMP + INTERVAL '14 days', CURRENT_TIMESTAMP + INTERVAL '13 days'),
(5, 2, 5, CURRENT_TIMESTAMP + INTERVAL '14 days', NULL),
(6, 4, 6, CURRENT_TIMESTAMP + INTERVAL '14 days', CURRENT_TIMESTAMP + INTERVAL '7 days'),
(7, 5, 7, CURRENT_TIMESTAMP + INTERVAL '14 days', NULL),
(8, 6, 8, CURRENT_TIMESTAMP + INTERVAL '14 days', CURRENT_TIMESTAMP + INTERVAL '15 days'),
(9, 7, 9, CURRENT_TIMESTAMP + INTERVAL '14 days', NULL),
(10, 8, 10, CURRENT_TIMESTAMP + INTERVAL '14 days', CURRENT_TIMESTAMP + INTERVAL '12 days'),
(11, 1, 11, CURRENT_TIMESTAMP + INTERVAL '14 days', NULL),
(12, 2, 12, CURRENT_TIMESTAMP + INTERVAL '14 days', CURRENT_TIMESTAMP + INTERVAL '8 days'),
(13, 3, 13, CURRENT_TIMESTAMP + INTERVAL '14 days', NULL),
(14, 4, 14, CURRENT_TIMESTAMP + INTERVAL '14 days', CURRENT_TIMESTAMP + INTERVAL '14 days'),
(15, 5, 15, CURRENT_TIMESTAMP + INTERVAL '14 days', NULL),
(16, 6, 16, CURRENT_TIMESTAMP - INTERVAL '20 days', NULL),
(17, 7, 17, CURRENT_TIMESTAMP - INTERVAL '25 days', NULL),
(18, 8, 18, CURRENT_TIMESTAMP - INTERVAL '30 days', NULL),
(19, 1, 19, CURRENT_TIMESTAMP - INTERVAL '15 days', CURRENT_TIMESTAMP + INTERVAL '2 days'),
(20, 2, 20, CURRENT_TIMESTAMP - INTERVAL '10 days', CURRENT_TIMESTAMP - INTERVAL '5 days');


INSERT INTO reservations (book_id, member_id, status) VALUES
-- Some pending reservations (waiting in queue)
(1, 6, 'pending'),
(2, 7, 'pending'),
(3, 8, 'pending'),
(4, 9, 'pending'),
(5, 10, 'pending'),

-- Ready reservations (book is available for pickup)
(6, 11, 'ready'),
(7, 12, 'ready'),
(8, 13, 'ready'),
(9, 14, 'ready'),
(10, 15, 'ready'),

-- Accepted reservations (member has picked up the book)
(11, 16, 'accepted'),
(12, 17, 'accepted'),
(13, 18, 'accepted'),
(14, 19, 'accepted'),
(15, 20, 'accepted'),

-- Cancelled reservations (either by member or system)
(16, 21, 'cancelled'),
(17, 22, 'cancelled'),
(18, 23, 'cancelled'),
(19, 24, 'cancelled'),
(20, 25, 'cancelled'),

-- Additional mixed status reservations
(1, 7, 'ready'),
(2, 8, 'accepted'),
(3, 9, 'pending'),
(4, 10, 'cancelled'),
(5, 11, 'pending'),
(6, 12, 'ready'),
(7, 13, 'accepted'),
(8, 14, 'cancelled'),
(9, 15, 'pending'),
(10, 16, 'ready');

-- Insert fines
INSERT INTO fines (loan_id, member_id, amount, paid_date) VALUES
(21, 1, 5.00, NULL),
(22, 2, 10.00, CURRENT_TIMESTAMP),
(23, 3, 15.00, NULL),
(24, 4, 7.50, CURRENT_TIMESTAMP),
(25, 5, 12.50, NULL),
(28, 8, 20.00, NULL),
(26, 16, 25.00, NULL),
(27, 17, 30.00, NULL),
(28, 18, 35.00, NULL),
(29, 19, 8.00, CURRENT_TIMESTAMP),
(30, 20, 15.50, CURRENT_TIMESTAMP),
(36, 6, 4.50, CURRENT_TIMESTAMP),
(37, 7, 9.00, NULL),
(39, 9, 11.00, NULL),
(40, 10, 6.50, CURRENT_TIMESTAMP),
(31, 11, 13.00, NULL),
(32, 12, 16.50, CURRENT_TIMESTAMP),
(33, 13, 22.00, NULL),
(34, 14, 18.50, CURRENT_TIMESTAMP),
(35, 15, 27.50, NULL);