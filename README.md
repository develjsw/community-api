### [ NestJS ] 아키텍처와 코드 품질, 유지보수를 함께 고민하는 공간

#### 커뮤니티 서비스 ERD (한글 버전)
![Untitled (1)](https://github.com/user-attachments/assets/a405d0b5-3f0d-47ad-bfc4-f883c5812a1f)

#### API Design/Architecture
1. Layer
  - `Presentation(Interface) Layer` : 외부에서 시스템에 진입하는 지점
    - controller : API 요청을 받고 use-case 호출
    - route/module : 모듈/라우팅 구성 (NestJS Module 단위)
    - dto : 요청받은 데이터 유효성 체크, 데이터 변환
  

  - `Application Layer` : 유스케이스 단위의 서비스, 흐름을 조합하며 도메인 객체를 활용함
    - use-case : 비즈니스 플로우 정의, 단일 유스케이스 수행 (ex. 게시글 생성, 댓글 작성)
    - service(aggregator) : 여러 유스케이스 또는 도메인을 조합한 복잡한 흐름을 처리 (단, 도메인 규칙 자체는 Domain Layer에 위임)


  - `Domain Layer` : 비즈니스 규칙의 중심이 되는 핵심 모델, 외부 의존성 없음
    - entity : 비즈니스 개체의 불변성과 규칙을 담은 클래스들
    - repository(interface) : 도메인 입장에서 본 추상 저장소
    - service : 엔티티 단독으로 처리하기 어려운 도메인 로직
    - factory : 복잡한 생성 로직이 필요한 도메인 객체를 만들 때
  

  - `Infrastructure Layer` : 외부 시스템 연동 및 구현 기술이 위치 (DB, 외부 API 등)
    - database : (prisma 기준) Prisma Client, Schema, Transaction 관련 로직
    - repository : ORM 과 연동된 repository 구현체


  - (Shared Layer) : 전역 예외처리, 인터셉터, 공통 유틸, 커스텀 데코레이터 등 (모든 계층에서 참조 가능)


2. 계층 간 의존성 흐름
  - 상위 계층은 하위 계층을 의존할 수 있지만, 하위 계층은 상위 계층에 의존하면 안됨
  - Presentation/Interface Layer → Application Layer → Domain Layer ← Infrastructure Layer
    - EX) Controller(PostController) → UseCase(CreatePostUseCase) → Repository Interface(PostRepositoryInterface) ← Repository(PrismaPostRepository)

    | **계층**        | **상위/하위** | **의존 여부**                                                                 |
    |----------------|---------------|--------------------------------------------------------------------------------|
    | Domain         | 가장 상위      | 다른 계층에 직접 의존하지 않음<br>구현체는 외부에서 주입됨 (DIP 적용)              |
    | Application    | 상위           | Domain의 Entity 및 Interface에 의존                                            |
    | Interface      | 하위           | Application의 UseCase에 의존                                                   |
    | Infrastructure | 가장 하위      | Domain 또는 Application의 Interface를 구현 (구현체 역할)                         |


3. 참고
- 어떤 계층이 다른 계층의 클래스를 `import`, `DI`, 상속/구현 등의 방식으로 사용한다면 → "의존한다"고 표현함
  - 즉, 코드 내에서 `A가 B를 사용한다면` → `A는 B에 의존한다`는 뜻
- Domain은 Repository 인터페이스만 정의하고, 실제 구현은 Infrastructure 계층에 위임됨
  - 이때 Domain은 구현체를 몰라도 되고, Infrastructure는 Domain의 인터페이스를 알아야 구현할 수 있음
  - 이는 의존성 역전 원칙(DIP)에 부합하는 구조임