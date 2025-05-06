### [ NestJS ] 아키텍처와 코드 품질, 유지보수를 함께 고민하는 공간

#### 커뮤니티 서비스 ERD (한글 버전)
![Untitled (1)](https://github.com/user-attachments/assets/a405d0b5-3f0d-47ad-bfc4-f883c5812a1f)

#### API Architecture & Design Principles
1. 아키텍처 개요
   - Domain 기반 Layered Architecture
     - 모듈 단위 Layered 구조
       - 도메인별 디렉토리 구성 ( post, comment, user 등 )
       - 모듈 내 응집도 ( High Cohesion ) ↑, 모듈 간 결합도 ( Low Coupling ) ↓
     - 레이어 기반 관심사 분리
       - controller, service, repository, dto 등 역할별 책임 분리
   - Lightweight CQRS Pattern
     - Command / Query 분리
       - 쓰기(명령)와 읽기(조회)의 책임과 모델을 명확하게 분리
     - Master / Slave DB 분리
       - 쓰기 작업은 master db, 읽기 작업은 slave db로 나누어 성능 최적화

