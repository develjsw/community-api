CREATE DATABASE IF NOT EXISTS community DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE community;

CREATE USER IF NOT EXISTS 'community_user'@'%' IDENTIFIED BY 'community_password';
GRANT REPLICATION SLAVE ON *.* TO 'community_user'@'%';
FLUSH PRIVILEGES;

-- 게시판
CREATE TABLE board (
board_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '게시판 PK',
board_name VARCHAR(150) NOT NULL COMMENT '게시판 이름',
member_id INT NOT NULL COMMENT '게시판 등록자 (회원 FK)',
description TEXT COMMENT '게시판 소개글',
created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '게시판 등록일',
deleted_at DATETIME COMMENT '게시판 삭제일'
);

-- 카테고리
CREATE TABLE category (
category_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '카테고리 PK',
board_id INT COMMENT '게시판 FK',
parent_category_id INT COMMENT '부모 카테고리 FK',
category_depth INT NOT NULL DEFAULT 0 COMMENT '카테고리 뎁스',
category_name VARCHAR(100) NOT NULL COMMENT '카테고리 이름',
created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '카테고리 등록일',
updated_at DATETIME COMMENT '카테고리 수정일',
deleted_at DATETIME COMMENT '카테고리 삭제일'
);

-- 게시글
CREATE TABLE post (
post_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '게시글 PK',
board_id INT NOT NULL COMMENT '게시판 FK',
member_id INT NOT NULL COMMENT '게시글 등록자 (회원 FK)',
title VARCHAR(200) NOT NULL COMMENT '게시글 제목',
content TEXT NOT NULL COMMENT '게시글 내용',
view_count INT NOT NULL DEFAULT 0 COMMENT '게시글 조회수',
created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '게시글 등록일',
updated_at DATETIME COMMENT '게시글 수정일',
deleted_at DATETIME COMMENT '게시글 삭제일'
);

-- 게시글 파일
CREATE TABLE post_file (
post_file_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '게시글 파일 PK',
post_id INT NOT NULL COMMENT '게시글 FK',
file_path VARCHAR(100) NOT NULL COMMENT '게시글 파일경로',
file_origin_name VARCHAR(100) NOT NULL COMMENT '게시글 원본 파일명',
file_hash_name VARCHAR(200) NOT NULL COMMENT '게시글 해시 파일명',
created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '게시글 파일 등록일'
);

-- 게시글 리액션
CREATE TABLE post_reaction (
post_id INT NOT NULL COMMENT '게시글 FK',
member_id INT NOT NULL COMMENT '회원 FK',
reaction_type VARCHAR(10) NOT NULL COMMENT '리액션 타입 (LIKE, DISLIKE)',
created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
PRIMARY KEY (post_id, member_id)
);

-- 댓글
CREATE TABLE comment (
comment_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '댓글 PK',
post_id INT NOT NULL COMMENT '게시글 FK',
member_id INT NOT NULL COMMENT '댓글 등록자 (회원 FK)',
parent_comment_id INT COMMENT '부모 댓글 번호 (nullable)',
content TEXT NOT NULL COMMENT '댓글 내용',
created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '댓글 등록일',
updated_at DATETIME COMMENT '댓글 수정일',
deleted_at DATETIME COMMENT '댓글 삭제일'
);

-- 댓글 파일
CREATE TABLE comment_file (
comment_file_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '댓글 파일 PK',
comment_id INT NOT NULL COMMENT '댓글 FK',
file_path VARCHAR(100) NOT NULL COMMENT '댓글 파일경로',
file_origin_name VARCHAR(100) NOT NULL COMMENT '댓글 원본 파일명',
file_hash_name VARCHAR(200) NOT NULL COMMENT '댓글 해시 파일명',
created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '댓글 파일 등록일'
);

-- 게시글 해시태그
CREATE TABLE post_hashtag (
post_hashtag_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '게시글 해시태그 PK',
post_id INT NOT NULL COMMENT '게시글 FK',
hashtag_name VARCHAR(50) NOT NULL COMMENT '해시태그명',
created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '해시태그 등록일'
);

-- 댓글 해시태그
CREATE TABLE comment_hashtag (
comment_hashtag_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '댓글 해시태그 PK',
comment_id INT NOT NULL COMMENT '댓글 FK',
hashtag_name VARCHAR(50) NOT NULL COMMENT '해시태그명',
created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '해시태그 등록일'
);

-- 회원
CREATE TABLE member (
member_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '회원 PK',
member_name VARCHAR(50) NOT NULL COMMENT '회원 이름',
email VARCHAR(100) NOT NULL UNIQUE COMMENT '회원 이메일',
password VARCHAR(200) NOT NULL COMMENT '회원 비밀번호',
created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '회원 가입일',
updated_at DATETIME COMMENT '회원 정보 수정일',
deleted_at DATETIME COMMENT '회원 탈퇴일'
);

-- 회원 로그인 로그
CREATE TABLE member_login_log (
member_login_log_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '로그인 로그 PK',
member_id INT NOT NULL COMMENT '회원 FK',
ip VARCHAR(45) COMMENT 'IP',
device_type VARCHAR(10) COMMENT 'PC/MOBILE',
created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일시'
);

-- 회원 차단
CREATE TABLE member_block (
blocker_member_id INT NOT NULL COMMENT '회원 PK (차단자)',
blocked_member_id INT NOT NULL COMMENT '회원 PK (대상자)',
reason TEXT COMMENT '차단 사유',
created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '차단 등록일',
PRIMARY KEY (blocker_id, blocked_id)
);

-- 회원 차단 로그
CREATE TABLE member_block_log (
member_block_log_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '로그 PK',
blocker_member_id INT NOT NULL COMMENT '차단자 회원 PK',
blocked_member_id INT NOT NULL COMMENT '차단 대상 회원 PK',
reason TEXT COMMENT '차단 사유',
block_action_type VARCHAR(7) NOT NULL COMMENT 'BLOCK 또는 UNBLOCK',
action_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '차단 등록/해제 처리일'
);

-- 키워드
CREATE TABLE keyword (
keyword_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '키워드 PK',
keyword_name VARCHAR(100) NOT NULL COMMENT '키워드명',
member_id INT COMMENT '키워드 등록자 (회원 FK)',
created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '키워드 등록일',
deleted_at DATETIME COMMENT '키워드 삭제일'
);

-- 키워드 알림
CREATE TABLE keyword_notification (
keyword_notification_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '알림 PK',
keyword_name VARCHAR(100) NOT NULL COMMENT '매칭된 키워드명',
title VARCHAR(255) NOT NULL COMMENT '알림 제목',
post_id INT COMMENT '매칭된 게시글 번호 (FK)',
notified_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '알림 전송일시'
);

-- 외래키 제약조건
ALTER TABLE board ADD FOREIGN KEY (member_id) REFERENCES member(member_id);
ALTER TABLE category ADD FOREIGN KEY (board_id) REFERENCES board(board_id);
ALTER TABLE category ADD FOREIGN KEY (parent_category_id) REFERENCES category(category_id);
ALTER TABLE post ADD FOREIGN KEY (board_id) REFERENCES board(board_id);
ALTER TABLE post ADD FOREIGN KEY (member_id) REFERENCES member(member_id);
ALTER TABLE post_file ADD FOREIGN KEY (post_id) REFERENCES post(post_id);
ALTER TABLE post_reaction ADD FOREIGN KEY (post_id) REFERENCES post(post_id);
ALTER TABLE post_reaction ADD FOREIGN KEY (member_id) REFERENCES member(member_id);
ALTER TABLE comment ADD FOREIGN KEY (post_id) REFERENCES post(post_id);
ALTER TABLE comment ADD FOREIGN KEY (member_id) REFERENCES member(member_id);
ALTER TABLE comment ADD FOREIGN KEY (parent_comment_id) REFERENCES comment(comment_id);
ALTER TABLE comment_file ADD FOREIGN KEY (comment_id) REFERENCES comment(comment_id);
ALTER TABLE post_hashtag ADD FOREIGN KEY (post_id) REFERENCES post(post_id);
ALTER TABLE comment_hashtag ADD FOREIGN KEY (comment_id) REFERENCES comment(comment_id);
ALTER TABLE member_login_log ADD FOREIGN KEY (member_id) REFERENCES member(member_id);
ALTER TABLE member_block ADD FOREIGN KEY (blocker_member_id) REFERENCES member(member_id);
ALTER TABLE member_block ADD FOREIGN KEY (blocked_member_id) REFERENCES member(member_id);
ALTER TABLE member_block_log ADD FOREIGN KEY (blocker_member_id) REFERENCES member(member_id);
ALTER TABLE member_block_log ADD FOREIGN KEY (blocked_member_id) REFERENCES member(member_id);
ALTER TABLE keyword ADD FOREIGN KEY (member_id) REFERENCES member(member_id);
ALTER TABLE keyword_notification ADD FOREIGN KEY (post_id) REFERENCES post(post_id);
