
-- 4096 ... default max length absolute path linux

-- project,site,place,pictures

CREATE TABLE oconim_project (
    id INT AUTO_INCREMENT PRIMARY KEY ,
    name VARCHAR(100) NOT NULL,
    path VARCHAR(4096) NOT NULL
) DEFAULT CHARSET=utf8;

CREATE TABLE oconim_site (
    id INT AUTO_INCREMENT PRIMARY KEY ,
    name VARCHAR(100) NOT NULL,
    path VARCHAR(4096) NOT NULL,
    project_id INT NOT NULL,
    INDEX ind_site_project_id (project_id),
    FOREIGN KEY (project_id) 
        REFERENCES oconim_project(id)
        ON DELETE CASCADE
) DEFAULT CHARSET=utf8;

CREATE TABLE oconim_place (
    id INT AUTO_INCREMENT PRIMARY KEY ,
    name VARCHAR(100) NOT NULL,
    path VARCHAR(4096) NOT NULL,
    site_id INT NOT NULL,
    INDEX ind_place_site_id (site_id),
    FOREIGN KEY (site_id) 
        REFERENCES oconim_site(id)
        ON DELETE CASCADE
   
) DEFAULT CHARSET=utf8;

CREATE TABLE oconim_picture (
    id INT AUTO_INCREMENT PRIMARY KEY ,
    name VARCHAR(100) NOT NULL,
    path VARCHAR(4096) NOT NULL,
    place_id INT NOT NULL,
    INDEX ind_picture_place_id (place_id),
    FOREIGN KEY (place_id) 
        REFERENCES oconim_place(id)
        ON DELETE CASCADE
) DEFAULT CHARSET=utf8;

-- user/company

CREATE TABLE oconim_company (
    id INT AUTO_INCREMENT PRIMARY KEY ,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL
) DEFAULT CHARSET=utf8;

CREATE TABLE oconim_user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    tel VARCHAR(255),
    isadmin BOOLEAN NOT NULL DEFAULT FALSE,
    company_id INT,    
    INDEX ind_user_company_id (company_id),
    FOREIGN KEY (company_id) 
        REFERENCES oconim_company(id)
        ON DELETE CASCADE,
    CONSTRAINT ux_user_username
        UNIQUE (username)
) DEFAULT CHARSET=utf8;

-- issue

CREATE TABLE oconim_issue (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(100) NOT NULL,    
    touser_id INT NOT NULL,
    INDEX ind_issue_touser_id (touser_id),
    FOREIGN KEY (touser_id) 
        REFERENCES oconim_user(id)
        ON DELETE CASCADE
) DEFAULT CHARSET=utf8;

CREATE TABLE oconim_issue_pictures (
    issue_id INT NOT NULL,
    picture_id INT NOT NULL,
    PRIMARY KEY(issue_id, picture_id),
    FOREIGN KEY (issue_id) 
        REFERENCES oconim_issue(id)
        ON DELETE CASCADE,
    FOREIGN KEY (picture_id) 
        REFERENCES oconim_picture(id)
        ON DELETE CASCADE
) DEFAULT CHARSET=utf8;

CREATE TABLE oconim_issue_tags (
    issue_id INT NOT NULL,
    tkey VARCHAR(50),
    tval TEXT,
    FOREIGN KEY (issue_id) 
        REFERENCES oconim_issue(id)
        ON DELETE CASCADE
) DEFAULT CHARSET=utf8;