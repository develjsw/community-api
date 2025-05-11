### [ NestJS ] 아키텍처와 코드 품질, 유지보수를 함께 고민하는 공간

#### 커뮤니티 서비스 ERD (한글 버전)
![Untitled (1)](https://github.com/user-attachments/assets/a405d0b5-3f0d-47ad-bfc4-f883c5812a1f)

#### API Architecture & Design Principles
1. 아키텍처 개요
   - Domain 기반 Layered Architecture
     - 모듈 단위 Layered 구조
       - 도메인별 디렉토리 구성 ( post, comment, user 등 )
       - 모듈 내 응집도 ↑, 모듈 간 결합도 ↓
     - 레이어 기반 관심사 분리
       - controller, service, repository, dto 등 역할별 책임 분리
   - 경량 CQRS 적용
     - Command / Query 분리
       - 쓰기(명령)와 읽기(조회)의 책임과 모델을 명확하게 분리
     - Master / Slave DB 분리
       - 쓰기 작업은 master db, 읽기 작업은 slave db로 나누어 성능 최적화


2. 초기 설정
   - 의존성 설치
     ~~~
     $ npm i
     ~~~
   - MySQL Master/Slave 컨테이너 실행
     ~~~
     $ docker-compose up -d --build
     ~~~
   - Master-Slave 복제 구성  
     - Master DB 상태 확인 ( Root 계정 )
       ~~~
       $ docker exec -it [호스트명] mysql -u[유저명] -p[비밀번호] -e "SHOW MASTER STATUS\G"
       EX) $ docker exec -it mysql-master mysql -uroot -proot -e "SHOW MASTER STATUS\G" 
     
       # 결과 #
       *************************** 1. row ***************************
       File: mysql-bin.000003
       Position: 157
       Binlog_Do_DB:
       Binlog_Ignore_DB:
       Executed_Gtid_Set:
       ~~~
     - Slave DB에 복제 설정 ( Root 계정 )
       ~~~
       $ docker exec -it [Slave DB 호스트명] mysql -u[Slave DB 유저명] -p[Slave DB 비밀번호] -e "CHANGE REPLICATION SOURCE TO SOURCE_HOST='[Master DB 호스트명]', SOURCE_USER='[Master DB 유저명]', SOURCE_PASSWORD='[Master DB 비밀번호]', SOURCE_LOG_FILE='[위에 명령어로 조회된 File명]', SOURCE_LOG_POS=[위에 명령어로 조회된 Position명];"
       EX) $ docker exec -it mysql-slave mysql -uroot -proot -e "CHANGE REPLICATION SOURCE TO SOURCE_HOST='mysql-master', SOURCE_USER='community_user', SOURCE_PASSWORD='community_password', SOURCE_LOG_FILE='mysql-bin.000003', SOURCE_LOG_POS=157;"
       ~~~
     - Slave DB 복제 시작
       ~~~
       $ docker exec -it [호스트명] mysql -u[유저명] -p[패스워드] -e "START REPLICA;"
       EX) $ docker exec -it mysql-slave mysql -uroot -proot -e "START REPLICA;"
       ~~~
     - Slave DB 복제 상태 확인
       ~~~
       $ docker exec -it [호스트명] mysql -u[유저명] -p[패스워드] -e "SHOW REPLICA STATUS\G"
       EX) $ docker exec -it mysql-slave mysql -uroot -proot -e "SHOW REPLICA STATUS\G"
     
       # 결과 #
       *************************** 1. row ***************************
       Replica_IO_State: Waiting for source to send event
       Source_Host: mysql-master
       Source_User: community_user
       Source_Port: 3306
       Connect_Retry: 60
       Source_Log_File: mysql-bin.000003
       Read_Source_Log_Pos: 157
       Relay_Log_File: relay-log.000002
       Relay_Log_Pos: 326
       Relay_Source_Log_File: mysql-bin.000003
       Replica_IO_Running: Yes
       Replica_SQL_Running: Yes
       Replicate_Do_DB:
       Replicate_Ignore_DB:
       Replicate_Do_Table:
       Replicate_Ignore_Table:
       Replicate_Wild_Do_Table:
       Replicate_Wild_Ignore_Table:
       Last_Errno: 0
       Last_Error:
       Skip_Counter: 0
       Exec_Source_Log_Pos: 157
       Relay_Log_Space: 530
       Until_Condition: None
       Until_Log_File:
       Until_Log_Pos: 0
       Source_SSL_Allowed: No
       Source_SSL_CA_File:
       Source_SSL_CA_Path:
       Source_SSL_Cert:
       Source_SSL_Cipher:
       Source_SSL_Key:
       Seconds_Behind_Source: 0
       Source_SSL_Verify_Server_Cert: No
       Last_IO_Errno: 0
       Last_IO_Error:
       Last_SQL_Errno: 0
       Last_SQL_Error:
       Replicate_Ignore_Server_Ids:
       Source_Server_Id: 1
       Source_UUID: 아이디값
       Source_Info_File: mysql.slave_master_info
       SQL_Delay: 0
       SQL_Remaining_Delay: NULL
       Replica_SQL_Running_State: Replica has read all relay log; waiting for more updates
       Source_Retry_Count: 86400
       Source_Bind:
       Last_IO_Error_Timestamp:
       Last_SQL_Error_Timestamp:
       Source_SSL_Crl:
       Source_SSL_Crlpath:
       Retrieved_Gtid_Set:
       Executed_Gtid_Set:
       Auto_Position: 0
       Replicate_Rewrite_DB:
       Channel_Name:
       Source_TLS_Version:
       Source_public_key_path:
       Get_Source_public_key: 0
       Network_Namespace:
       ~~~
   - Prisma 설정
     - Prisma Schema Pull
       ~~~
       $ npm run master:prisma:db:pull
       $ npm run slave:prisma:db:pull
       ~~~
     - Prisma Client Generate
       ~~~
       $ npm run master:prisma:generate
       $ npm run slave:prisma:generate
       ~~~