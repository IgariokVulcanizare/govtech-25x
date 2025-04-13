-- ==============================================================================
-- Database structure for the Republic of Moldova
-- ==============================================================================

-- ============================================================================
-- 1. TABLE: Pacienți (persoană fizică – pacient)
-- ============================================================================
CREATE TABLE Pacienti (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idnp VARCHAR(20) UNIQUE NOT NULL,                       -- Numărul de identificare de stat
    nume TEXT NOT NULL,
    prenume TEXT NOT NULL,
    patronimic TEXT,
    sex TEXT,                                               -- Exemplu: 'M' sau 'F'
    data_nasterii DATE,
    grupa_sanguina VARCHAR(5),
    
    -- Date demografice
    cetatenie TEXT,
    tip_document_identificare TEXT,
    numar_document TEXT,
    data_emitere_document DATE,
    data_expirare_document DATE,
    
    -- Adresa de reședință (permanentă & temporară)
    adresa_localitate TEXT,
    adresa_tara TEXT,
    strada TEXT,
    bloc TEXT,
    apartament TEXT,
    
    -- Date privind asigurarea medicală
    categoria_asigurat TEXT,
    statut_asigurat TEXT,
    asigurator TEXT,
    tip_asigurare TEXT,
    
    -- Date socioeconomice – locul de muncă/studii
    loc_munca_studii TEXT,
    
    -- Date specifice despre sănătate
    date_evidenta TEXT,
    date_triaj TEXT,
    date_consultatii TEXT,
    date_diagnostice TEXT,
    date_examen_laborator TEXT,
    date_efecte_adverse TEXT,
    date_programe_sanatate TEXT,
    
    -- Date administrative pentru pacienții spitalizați
    data_prezentare DATE,
    data_internare DATE,
    date_miscar_intraspitaliceasca TEXT,
    data_externare DATE
);

-- Inserăm 20 rânduri cu date random pentru Pacienți (exemple fictive, adaptate la Moldova):
INSERT INTO Pacienti (idnp, nume, prenume, patronimic, sex, data_nasterii, grupa_sanguina, cetatenie, tip_document_identificare, numar_document, data_emitere_document, data_expirare_document, adresa_localitate, adresa_tara, strada, bloc, apartament, categoria_asigurat, statut_asigurat, asigurator, tip_asigurare, loc_munca_studii, date_evidenta, date_triaj, date_consultatii, date_diagnostice, date_examen_laborator, date_efecte_adverse, date_programe_sanatate, data_prezentare, data_internare, date_miscar_intraspitaliceasca, data_externare)
VALUES 
('1000000000001', 'Popa', 'Ion', 'Vasile', 'M', '1980-05-15', 'A+', 'Moldovenească', 'CI', 'MP123456', '2001-01-01', '2011-01-01', 'Chișinău', 'Moldova', 'Str. Unirii', 'A', '12', 'Standard', 'Activ', 'AsigMed', 'Tip A', 'Angajat', 'Evidență 1', 'Triaj 1', 'Consultație 1', 'Diagnostic 1', 'Examen 1', 'Niciun efect', 'Program 1', '2023-10-10', '2023-10-11', 'Internare 1', '2023-10-20'),
('1000000000002', 'Ionescu', 'Maria', 'Grigore', 'F', '1990-08-25', 'B-', 'Moldovenească', 'BI', 'MP234567', '2006-03-10', '2016-03-10', 'Bălți', 'Moldova', 'Str. Libertății', 'B', '5B', 'Premium', 'Activ', 'AsigLife', 'Tip B', 'Student', 'Evidență 2', 'Triaj 2', 'Consultație 2', 'Diagnostic 2', 'Examen 2', 'Reacție ușoară', 'Program 2', '2023-09-01', '2023-09-02', 'Internare 2', '2023-09-10'),
('1000000000003', 'Rusu', 'Andrei', 'Petru', 'M', '1975-12-05', 'O+', 'Moldovenească', 'CI', 'MP345678', '2000-07-20', '2010-07-20', 'Chișinău', 'Moldova', 'Bld. Libertății', 'C', '8', 'Standard', 'Activ', 'AsigPlus', 'Tip C', 'Angajat', 'Evidență 3', 'Triaj 3', 'Consultație 3', 'Diagnostic 3', 'Examen 3', 'Moderate reacții', 'Program 3', '2023-08-15', '2023-08-16', 'Internare 3', '2023-08-25'),
('1000000000004', 'Chitic', 'Elena', 'Nistor', 'F', '1985-03-30', 'AB-', 'Moldovenească', 'BI', 'MP456789', '2002-11-05', '2012-11-05', 'Chișinău', 'Moldova', 'Str. Independenței', 'D', '2', 'Basic', 'Activ', 'AsigCare', 'Tip A', 'Profesională', 'Evidență 4', 'Triaj 4', 'Consultație 4', 'Diagnostic 4', 'Examen 4', 'Fără reacții', 'Program 4', '2023-07-20', '2023-07-21', 'Internare 4', '2023-07-30'),
('1000000000005', 'Ivan', 'Vasile', 'Dumitru', 'M', '1995-11-11', 'O-', 'Moldovenească', 'CI', 'MP567890', '2010-06-15', '2020-06-15', 'Bălți', 'Moldova', 'Str. Mihai Eminescu', 'E', '7A', 'Avansat', 'Pasiv', 'AsigSafe', 'Tip B', 'Angajat', 'Evidență 5', 'Triaj 5', 'Consultație 5', 'Diagnostic 5', 'Examen 5', 'Reacții ușoare', 'Program 5', '2023-06-10', '2023-06-11', 'Internare 5', '2023-06-20'),
('1000000000006', 'Moldovan', 'Oana', 'Stefan', 'F', '1988-02-14', 'A+', 'Moldovenească', 'CI', 'MP678901', '2003-04-01', '2013-04-01', 'Chișinău', 'Moldova', 'Str. 1 Mai', 'F', '3', 'Standard', 'Activ', 'AsigMed', 'Tip A', 'Freelancer', 'Evidență 6', 'Triaj 6', 'Consultație 6', 'Diagnostic 6', 'Examen 6', 'Fără reacții', 'Program 6', '2023-05-05', '2023-05-06', 'Internare 6', '2023-05-15'),
('1000000000007', 'Radu', 'Alexandru', 'Constantin', 'M', '1982-09-09', 'B+', 'Moldovenească', 'BI', 'MP789012', '2007-08-08', '2017-08-08', 'Chișinău', 'Moldova', 'Str. Dacia', 'G', '12B', 'Premium', 'Activ', 'AsigLife', 'Tip B', 'Angajat', 'Evidență 7', 'Triaj 7', 'Consultație 7', 'Diagnostic 7', 'Examen 7', 'Reacții minore', 'Program 7', '2023-04-04', '2023-04-05', 'Internare 7', '2023-04-14'),
('1000000000008', 'Pavel', 'Bogdan', 'Lucian', 'M', '1978-06-20', 'O-', 'Moldovenească', 'CI', 'MP890123', '2002-10-10', '2012-10-10', 'Bălți', 'Moldova', 'Str. Stefan cel Mare', 'H', '9', 'Standard', 'Activ', 'AsigPlus', 'Tip C', 'Angajat', 'Evidență 8', 'Triaj 8', 'Consultație 8', 'Diagnostic 8', 'Examen 8', 'Reacții moderate', 'Program 8', '2023-03-03', '2023-03-04', 'Internare 8', '2023-03-13'),
('1000000000009', 'Cojocaru', 'Dana', 'Marin', 'F', '1992-07-07', 'AB+', 'Moldovenească', 'CI', 'MP901234', '2008-09-15', '2018-09-15', 'Chișinău', 'Moldova', 'Str. Independentei', 'J', '22', 'Basic', 'Pasiv', 'AsigCare', 'Tip A', 'Student', 'Evidență 9', 'Triaj 9', 'Consultație 9', 'Diagnostic 9', 'Examen 9', 'Ușoare reacții', 'Program 9', '2023-02-02', '2023-02-03', 'Internare 9', '2023-02-12'),
('1000000000010', 'Grigorescu', 'Mihai', 'Petru', 'M', '1976-12-30', 'A-', 'Moldovenească', 'BI', 'MP012345', '2001-12-12', '2011-12-12', 'Bălți', 'Moldova', 'Str. Moldova', 'K', '5', 'Standard', 'Activ', 'AsigMed', 'Tip B', 'Angajat', 'Evidență 10', 'Triaj 10', 'Consultație 10', 'Diagnostic 10', 'Examen 10', 'Fără reacții', 'Program 10', '2023-01-01', '2023-01-02', 'Internare 10', '2023-01-11'),
('1000000000011', 'Petrov', 'Elena', 'Stefan', 'F', '1987-03-17', 'B+', 'Moldovenească', 'CI', 'MP112233', '2005-05-05', '2015-05-05', 'Chișinău', 'Moldova', 'Str. Centrală', 'L', '7', 'Premium', 'Activ', 'AsigLife', 'Tip C', 'Angajată', 'Evidență 11', 'Triaj 11', 'Consultație 11', 'Diagnostic 11', 'Examen 11', 'Reacții ușoare', 'Program 11', '2022-12-12', '2022-12-13', 'Internare 11', '2022-12-22'),
('1000000000012', 'Ciobanu', 'Vlad', 'Ilie', 'M', '1993-11-05', 'O+', 'Moldovenească', 'BI', 'MP223344', '2009-04-04', '2019-04-04', 'Bălți', 'Moldova', 'Str. Libertății', 'M', '10', 'Basic', 'Activ', 'AsigCare', 'Tip A', 'Angajat', 'Evidență 12', 'Triaj 12', 'Consultație 12', 'Diagnostic 12', 'Examen 12', 'Reacții minore', 'Program 12', '2022-11-11', '2022-11-12', 'Internare 12', '2022-11-21'),
('1000000000013', 'Marincu', 'Sergiu', 'Dumitru', 'M', '1983-04-22', 'AB-', 'Moldovenească', 'CI', 'MP334455', '2004-06-06', '2014-06-06', 'Chișinău', 'Moldova', 'Str. Victoriei', 'N', '4', 'Standard', 'Activ', 'AsigMed', 'Tip B', 'Angajat', 'Evidență 13', 'Triaj 13', 'Consultație 13', 'Diagnostic 13', 'Examen 13', 'Fără reacții', 'Program 13', '2022-10-10', '2022-10-11', 'Internare 13', '2022-10-20'),
('1000000000014', 'Cristea', 'Elena', 'Valentin', 'F', '1991-06-30', 'A+', '['Moldovenească', 'BI', 'MP445566', '2007-07-07', '2017-07-07', 'Chișinău', 'Moldova', 'Str. Dacia', 'O', '6B', 'Premium', 'Activ', 'AsigLife', 'Tip C', 'Studenta', 'Evidență 14', 'Triaj 14', 'Consultație 14', 'Diagnostic 14', 'Examen 14', 'Reacții minore', 'Program 14', '2022-09-09', '2022-09-10', 'Internare 14', '2022-09-19'),
('1000000000015', 'Donosor', 'Ivan', 'Cornel', 'M', '1980-10-10', 'B-', 'Moldovenească', 'CI', 'MP556677', '2000-10-10', '2010-10-10', 'Bălți', 'Moldova', 'Str. Principală', 'P', '8', 'Standard', 'Activ', 'AsigPlus', 'Tip A', 'Angajat', 'Evidență 15', 'Triaj 15', 'Consultație 15', 'Diagnostic 15', 'Examen 15', 'Moderate reacții', 'Program 15', '2022-08-08', '2022-08-09', 'Internare 15', '2022-08-18'),
('1000000000016', 'Stefanescu', 'Ioana', 'Marian', 'F', '1994-12-12', 'O-', 'Moldovenească', 'CI', 'MP667788', '2011-11-11', '2021-11-11', 'Chișinău', 'Moldova', 'Str. Mărășești', 'Q', '11', 'Basic', 'Pasiv', 'AsigCare', 'Tip B', 'Studenta', 'Evidență 16', 'Triaj 16', 'Consultație 16', 'Diagnostic 16', 'Examen 16', 'Ușoare reacții', 'Program 16', '2022-07-07', '2022-07-08', 'Internare 16', '2022-07-17'),
('1000000000017', 'Tudor', 'Adrian', 'Lucian', 'M', '1986-05-05', 'A-', 'Moldovenească', 'BI', 'MP778899', '2005-05-05', '2015-05-05', 'Bălți', 'Moldova', 'Str. Independenței', 'R', '3', 'Standard', 'Activ', 'AsigMed', 'Tip A', 'Angajat', 'Evidență 17', 'Triaj 17', 'Consultație 17', 'Diagnostic 17', 'Examen 17', 'Reacții minore', 'Program 17', '2022-06-06', '2022-06-07', 'Internare 17', '2022-06-16'),
('1000000000018', 'Sturza', 'Victoria', 'Alina', 'F', '1997-03-03', 'B+', 'Moldovenească', 'CI', 'MP889900', '2012-02-02', '2022-02-02', 'Chișinău', 'Moldova', 'Str. Orașului', 'S', '14', 'Premium', 'Activ', 'AsigLife', 'Tip B', 'Angajată', 'Evidență 18', 'Triaj 18', 'Consultație 18', 'Diagnostic 18', 'Examen 18', 'Fără reacții', 'Program 18', '2022-05-05', '2022-05-06', 'Internare 18', '2022-05-15'),
('1000000000019', 'Cebotari', 'Constantin', 'Vlad', 'M', '1989-07-07', 'O+', 'Moldovenească', 'BI', 'MP990011', '2008-08-08', '2018-08-08', 'Bălți', 'Moldova', 'Str. Decebal', 'T', '2', 'Basic', 'Activ', 'AsigCare', 'Tip C', 'Angajat', 'Evidență 19', 'Triaj 19', 'Consultație 19', 'Diagnostic 19', 'Examen 19', 'Reacții ușoare', 'Program 19', '2022-04-04', '2022-04-05', 'Internare 19', '2022-04-14'),
('1000000000020', 'Berezovita', 'Liana', 'Marcel', 'F', '1996-09-09', 'A+', 'Moldovenească', 'CI', 'MP101112', '2013-03-03', '2023-03-03', 'Chișinău', 'Moldova', 'Str. Libertății', 'U', '6', 'Premium', 'Activ', 'AsigLife', 'Tip B', 'Angajată', 'Evidență 20', 'Triaj 20', 'Consultație 20', 'Diagnostic 20', 'Examen 20', 'Fără reacții', 'Program 20', '2022-03-03', '2022-03-04', 'Internare 20', '2022-03-13');

UPDATE Pacienti
SET telefon = CASE idnp
  WHEN '1000000000001' THEN '+3736000001'
  WHEN '1000000000002' THEN '+3736000002'
  WHEN '1000000000003' THEN '+3736000003'
  WHEN '1000000000004' THEN '+3736000004'
  WHEN '1000000000005' THEN '+3736000005'
  WHEN '1000000000006' THEN '+3736000006'
  WHEN '1000000000007' THEN '+3736000007'
  WHEN '1000000000008' THEN '+3736000008'
  WHEN '1000000000009' THEN '+3736000009'
  WHEN '1000000000010' THEN '+3736000010'
  WHEN '1000000000011' THEN '+3736000011'
  WHEN '1000000000012' THEN '+3736000012'
  WHEN '1000000000013' THEN '+3736000013'
  WHEN '1000000000014' THEN '+3736000014'
  WHEN '1000000000015' THEN '+3736000015'
  WHEN '1000000000016' THEN '+3736000016'
  WHEN '1000000000017' THEN '+3736000017'
  WHEN '1000000000018' THEN '+3736000018'
  WHEN '1000000000019' THEN '+3736000019'
  WHEN '1000000000020' THEN '+3736000020'
  ELSE telefon
END;

-- ============================================================================
-- 2. TABLE: Lucrători Medicali (persoană fizică – lucrător medical)
-- ============================================================================
CREATE TABLE LucratoriMedicali (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idnp VARCHAR(20) UNIQUE NOT NULL,                        -- Numărul de identificare de stat
    nume TEXT NOT NULL,
    prenume TEXT NOT NULL,
    patronimic TEXT,
    sex TEXT,
    data_nasterii DATE,
    grupa_sanguina VARCHAR(5),
    
    -- Date demografice
    cetatenie TEXT,
    tip_document_identificare TEXT,
    numar_document TEXT,
    
    -- Adresa (preluată din registrul de stat al populației)
    adresa_localitate TEXT,
    strada TEXT,
    bloc TEXT,
    apartament TEXT,
    telefon_fax TEXT,
    telefon_mobil TEXT,
    
    -- Date privind asigurarea medicală
    categoria_asigurat TEXT,
    statut_asigurat TEXT,
    asigurator TEXT,
    tip_asigurare TEXT,
    
    -- Date socioeconomice – locul de muncă/studii
    loc_munca_studii TEXT
);

-- Inserăm 10 rânduri exemplificative pentru Lucrători Medicali:
INSERT INTO LucratoriMedicali (idnp, nume, prenume, patronimic, sex, data_nasterii, grupa_sanguina, cetatenie, tip_document_identificare, numar_document, adresa_localitate, strada, bloc, apartament, telefon_fax, telefon_mobil, categoria_asigurat, statut_asigurat, asigurator, tip_asigurare, loc_munca_studii)
VALUES
('2000000000001', 'Popescu', 'George', 'Ilie', 'M', '1970-04-10', 'A+', 'Moldovenească', 'CI', 'MP556600', 'Chișinău', 'Str. Medicilor', 'F', '101', '022-1234567', '077-9876543', 'Standard', 'Activ', 'AsigMed', 'Tip A', 'Spitalul Clinic'),
('2000000000002', 'Marin', 'Elena', 'Popa', 'F', '1982-09-12', 'B-', 'Moldovenească', 'BI', 'MP667711', 'Chișinău', 'Str. Sănătății', 'G', '202', '022-2345678', '078-8765432', 'Premium', 'Activ', 'AsigLife', 'Tip B', 'Clinica Privată'),
('2000000000003', 'Dumitrescu', 'Andrei', 'Georgiu', 'M', '1975-01-15', 'O+', 'Moldovenească', 'CI', 'MP778822', 'Bălți', 'Bld. Revoluției', 'H', '303', '022-3456789', '079-7654321', 'Standard', 'Pasiv', 'AsigPlus', 'Tip C', 'Spitalul Municipal'),
('2000000000004', 'Ionescu', 'Maria', 'Dumitrescu', 'F', '1988-12-22', 'AB-', 'Moldovenească', 'BI', 'MP889933', 'Chișinău', 'Str. Independenței', 'I', '404', '022-4567890', '076-6543210', 'Basic', 'Activ', 'AsigCare', 'Tip A', 'Spitalul Regional'),
('2000000000005', 'Georgescu', 'Radu', 'Marin', 'M', '1990-07-07', 'O-', 'Moldovenească', 'CI', 'MP990044', 'Bălți', 'Str. Libertății', 'J', '505', '022-5678901', '075-5432109', 'Avansat', 'Activ', 'AsigSafe', 'Tip B', 'Clinica de Urgență'),
('2000000000006', 'Stefan', 'Victor', 'Ion', 'M', '1985-02-20', 'A+', 'Moldovenească', 'CI', 'MP101122', 'Chișinău', 'Str. Centrală', 'K', '606', '022-6789012', '074-4321098', 'Standard', 'Activ', 'AsigMed', 'Tip A', 'Clinica Medpark'),
('2000000000007', 'Balan', 'Sergiu', 'Vasile', 'M', '1978-11-11', 'B+', 'Moldovenească', 'CI', 'MP112233', 'Chișinău', 'Str. Unirii', 'L', '707', '022-7890123', '073-3210987', 'Premium', 'Activ', 'AsigLife', 'Tip B', 'Clinica EuroMedic'),
('2000000000008', 'Stancu', 'Alina', 'Marinel', 'F', '1992-05-05', 'O-', 'Moldovenească', 'BI', 'MP223344', 'Bălți', 'Str. Moldova', 'M', '808', '022-8901234', '072-2109876', 'Basic', 'Activ', 'AsigCare', 'Tip A', 'Clinica Intermedica'),
('2000000000009', 'Ceban', 'Florin', 'Constantin', 'M', '1980-08-08', 'A-', 'Moldovenească', 'CI', 'MP334455', 'Chișinău', 'Str. Dacia', 'N', '909', '022-9012345', '071-1098765', 'Standard', 'Activ', 'AsigPlus', 'Tip C', 'Spitalul Clinic'),
('2000000000010', 'Danu', 'Ioan', 'Nistor', 'M', '1987-03-03', 'AB+', 'Moldovenească', 'BI', 'MP445566', 'Chișinău', 'Str. Doctorilor', 'O', '1010', '022-0123456', '070-0987654', 'Premium', 'Activ', 'AsigLife', 'Tip B', 'Clinica Medlife');

-- ============================================================================
-- 3. TABLE: Institutii Medicale
-- ============================================================================
CREATE TABLE InstitutiiMedicale (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idno VARCHAR(20) UNIQUE NOT NULL,                       -- Identificatorul instituției
    denumire TEXT,
    cod_fiscal TEXT,
    cod_ims TEXT,
    tip TEXT,                                               -- Ex: 'Spital', 'Clinică'
    numar_telefon TEXT,
    adresa_postala TEXT,
    email TEXT
);

-- Inserăm 8 rânduri cu date exemplificative pentru instituții medicale (publice și private din Moldova):
INSERT INTO InstitutiiMedicale (idno, denumire, cod_fiscal, cod_ims, tip, numar_telefon, adresa_postala, email)
VALUES
('IM001', 'Spitalul Clinic Chișinău', 'MD1234567', 'IMS001', 'Spital', '022-1112233', 'Str. Spitalului 1, Chișinău', 'contact@spitalchi.md'),
('IM002', 'Medpark Clinic', 'MD2345678', 'IMS002', 'Clinică (Privată)', '022-2223344', 'Str. Medicilor 2, Chișinău', 'info@medpark.md'),
('IM003', 'Clinica Medlife', 'MD3456789', 'IMS003', 'Clinică (Privată)', '022-3334455', 'Bld. Sănătății 3, Chișinău', 'office@medlife.md'),
('IM004', 'Clinica EuroMedic', 'MD4567890', 'IMS004', 'Clinică (Privată)', '022-4445566', 'Str. Europei 4, Chișinău', 'contact@euromedic.md'),
('IM005', 'Spitalul Municipal Bălți', 'MD5678901', 'IMS005', 'Spital', '022-5556677', 'Str. Spitalului 5, Bălți', 'office@spitalbalti.md'),
('IM006', 'Clinica Intermedica', 'MD6789012', 'IMS006', 'Clinică (Privată)', '022-6667788', 'Str. Independenței 6, Chișinău', 'info@intermedica.md'),
('IM007', 'Clinica Nova', 'MD7890123', 'IMS007', 'Clinică (Privată)', '022-7778899', 'Str. Progresului 7, Chișinău', 'contact@clinicanova.md'),
('IM008', 'Spitalul de Urgență Cahul', 'MD8901234', 'IMS008', 'Spital', '022-8889900', 'Str. Urgenței 8, Cahul', 'contact@spitalcahul.md');

-- ============================================================================
-- 4. TABLE: Medicamente (medicamente aflate în gestiunea instituțiilor medicale)
-- ============================================================================
CREATE TABLE Medicamente (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_medicament VARCHAR(20),              -- ID-ul medicamentului (nomenclator)
    unitate_masura TEXT,
    cantitate REAL,                         -- Cantitatea în unități indicate
    pret_unitar REAL,                       -- Prețul unei unități minime fără TVA
    pret_total REAL,                        -- Prețul total
    data_producere DATE,
    data_expirare DATE,
    stoc_factura TEXT,                      -- Referință la stoc/factura din care a fost creat stocul
    unitate_minima_distributie TEXT,
    numar_unitati INTEGER,
    cod_medicament TEXT,                    -- Codul medicamentului în Nomenclator
    nume_medicament TEXT,
    substanta_activa TEXT,
    unitate_elementara TEXT,
    numar_inregistrare VARCHAR(20),
    forma_farmaceutica TEXT,
    compania_producatoare TEXT,
    necesita_reteta BOOLEAN,
    este_substanta_activa BOOLEAN
);

-- Inserăm 5 rânduri exemplificative pentru Medicamente:
INSERT INTO Medicamente (id_medicament, unitate_masura, cantitate, pret_unitar, pret_total, data_producere, data_expirare, stoc_factura, unitate_minima_distributie, numar_unitati, cod_medicament, nume_medicament, substanta_activa, unitate_elementara, numar_inregistrare, forma_farmaceutica, compania_producatoare, necesita_reteta, este_substanta_activa)
VALUES
('MED001', 'ml', 100, 2.5, 250, '2023-01-01', '2024-01-01', 'Factura001', 'Flacon', 50, 'COD001', 'Aspirină', 'Acid acetilsalicilic', 'comprimate', 'NR001', 'Tablete', 'Farmaceutica A', 1, 1),
('MED002', 'capsule', 60, 1.0, 60, '2023-02-15', '2024-02-15', 'Factura002', 'Cutie', 30, 'COD002', 'Ibuprofen', 'Ibuprofen', 'capsulă', 'NR002', 'Capsule', 'Farmaceutica B', 1, 1),
('MED003', 'tablete', 200, 0.5, 100, '2022-12-01', '2023-12-01', 'Factura003', 'Blister', 20, 'COD003', 'Paracetamol', 'Paracetamol', 'tableta', 'NR003', 'Comprimate', 'Farmaceutica C', 0, 1),
('MED004', 'sachet', 50, 3.0, 150, '2023-03-10', '2024-03-10', 'Factura004', 'Pungă', 15, 'COD004', 'Vitamina C', 'Acid ascorbic', 'pudră', 'NR004', 'Solubil', 'Farmaceutica D', 0, 1),
('MED005', 'ml', 250, 0.8, 200, '2023-04-20', '2024-04-20', 'Factura005', 'Flacon', 25, 'COD005', 'Sirop de tuse', 'Dextrometorfan', 'sirop', 'NR005', 'Lichid', 'Farmaceutica E', 1, 1);

-- ============================================================================
-- 5. TABLE: Servicii Medicale
-- (atributele: codul serviciului medical, codul instituției medico-sanitare, numărul de identificare unic al lucrătorului medical)
-- ============================================================================
CREATE TABLE ServiciiMedicale (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cod_serviciu VARCHAR(20),
    id_institutie INTEGER,    -- Referință către InstitutiiMedicale (id)
    id_lucrator INTEGER,       -- Referință către LucratoriMedicali (id)
    FOREIGN KEY (id_institutie) REFERENCES InstitutiiMedicale(id),
    FOREIGN KEY (id_lucrator) REFERENCES LucratoriMedicali(id)
);

-- Inserăm 5 rânduri exemplificative pentru Servicii Medicale:
INSERT INTO ServiciiMedicale (cod_serviciu, id_institutie, id_lucrator)
VALUES
('SRV001', 1, 1),
('SRV002', 2, 2),
('SRV003', 3, 3),
('SRV004', 4, 4),
('SRV005', 5, 5);
