-- ============================================================
--  FOODLINK – SUPPLEMENT TABLES (thêm vào schema gốc)
--  6 nhóm bảng bổ sung theo review UC
-- ============================================================


-- ============================================================
--  1. GIỎ HÀNG – UC21
-- ============================================================

CREATE TABLE Carts (
    CartId      INT         PRIMARY KEY IDENTITY(1,1),
    CustomerId  INT         NOT NULL UNIQUE,   -- 1 khách 1 giỏ duy nhất
    CreatedAt   DATETIME2   NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt   DATETIME2   NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_Carts_Users FOREIGN KEY (CustomerId) REFERENCES Users(UserId)
);

CREATE TABLE CartItems (
    CartItemId          INT             PRIMARY KEY IDENTITY(1,1),
    CartId              INT             NOT NULL,
    ProductId           INT             NOT NULL,
    SupplierId          INT             NOT NULL,
    SelectedBatchId     INT             NULL,       -- Batch khách chọn (nếu có)
    Quantity            DECIMAL(12,2)   NOT NULL,
    UnitPrice           DECIMAL(12,2)   NOT NULL,   -- Snapshot giá tại thời điểm thêm vào giỏ
    CreatedAt           DATETIME2       NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt           DATETIME2       NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_CartItems_Carts     FOREIGN KEY (CartId)          REFERENCES Carts(CartId),
    CONSTRAINT FK_CartItems_Products  FOREIGN KEY (ProductId)       REFERENCES Products(ProductId),
    CONSTRAINT FK_CartItems_Suppliers FOREIGN KEY (SupplierId)      REFERENCES SupplierProfiles(SupplierId),
    CONSTRAINT FK_CartItems_Batches   FOREIGN KEY (SelectedBatchId) REFERENCES Batches(BatchId),
    CONSTRAINT UQ_CartItems           UNIQUE (CartId, ProductId, SelectedBatchId)
);

CREATE INDEX IX_CartItems_Cart    ON CartItems(CartId);
CREATE INDEX IX_CartItems_Product ON CartItems(ProductId);


-- ============================================================
--  2. RESET MẬT KHẨU & PHIÊN ĐĂNG NHẬP – UC05, UC06
-- ============================================================

-- Token riêng cho luồng quên/reset mật khẩu (tách khỏi OTP)
CREATE TABLE PasswordResetTokens (
    TokenId     INT             PRIMARY KEY IDENTITY(1,1),
    UserId      INT             NOT NULL,
    Token       NVARCHAR(500)   NOT NULL UNIQUE,   -- UUID hoặc signed JWT
    ExpiredAt   DATETIME2       NOT NULL,
    UsedAt      DATETIME2       NULL,               -- NULL = chưa dùng
    CreatedAt   DATETIME2       NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_PasswordResetTokens_Users FOREIGN KEY (UserId) REFERENCES Users(UserId)
);

CREATE INDEX IX_PasswordResetTokens_Token  ON PasswordResetTokens(Token);
CREATE INDEX IX_PasswordResetTokens_User   ON PasswordResetTokens(UserId);

-- Refresh Token cho phiên đăng nhập (JWT sliding session)
CREATE TABLE RefreshTokens (
    TokenId     INT             PRIMARY KEY IDENTITY(1,1),
    UserId      INT             NOT NULL,
    Token       NVARCHAR(500)   NOT NULL UNIQUE,
    ExpiredAt   DATETIME2       NOT NULL,
    RevokedAt   DATETIME2       NULL,               -- NULL = còn hiệu lực
    ReplacedBy  NVARCHAR(500)   NULL,               -- Token mới thay thế (rotation)
    CreatedAt   DATETIME2       NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_RefreshTokens_Users FOREIGN KEY (UserId) REFERENCES Users(UserId)
);

CREATE INDEX IX_RefreshTokens_Token ON RefreshTokens(Token);
CREATE INDEX IX_RefreshTokens_User  ON RefreshTokens(UserId);


-- ============================================================
--  3. LỊCH SỬ TRẠNG THÁI ĐƠN HÀNG – UC24
-- ============================================================

CREATE TABLE OrderStatusHistories (
    HistoryId   INT             PRIMARY KEY IDENTITY(1,1),
    OrderId     INT             NOT NULL,
    Status      VARCHAR(30)     NOT NULL,
    -- Pending | Confirmed | Preparing | ReadyToShip | Shipping | Delivered | Cancelled | Refunded
    Note        NVARCHAR(500)   NULL,
    CreatedAt   DATETIME2       NOT NULL DEFAULT GETUTCDATE(),
    CreatedBy   INT             NULL,   -- UserId thực hiện thay đổi (Admin/Supplier/System)
    CONSTRAINT FK_OrderStatusHistories_Orders FOREIGN KEY (OrderId)    REFERENCES Orders(OrderId),
    CONSTRAINT FK_OrderStatusHistories_Users  FOREIGN KEY (CreatedBy)  REFERENCES Users(UserId)
);

CREATE INDEX IX_OrderStatusHistories_Order ON OrderStatusHistories(OrderId);


-- ============================================================
--  4. SUPPLIER XÁC NHẬN ĐƠN – UC17
--     1 đơn hàng có thể gồm sản phẩm từ nhiều Supplier
-- ============================================================

CREATE TABLE SupplierOrderConfirmations (
    ConfirmationId  INT             PRIMARY KEY IDENTITY(1,1),
    OrderId         INT             NOT NULL,
    SupplierId      INT             NOT NULL,
    Status          VARCHAR(20)     NOT NULL DEFAULT 'Pending',
    -- Pending | Accepted | Rejected
    Reason          NVARCHAR(500)   NULL,       -- Lý do từ chối (nếu Rejected)
    ConfirmedAt     DATETIME2       NULL,
    CreatedAt       DATETIME2       NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_SupplierOrderConf_Orders    FOREIGN KEY (OrderId)    REFERENCES Orders(OrderId),
    CONSTRAINT FK_SupplierOrderConf_Suppliers FOREIGN KEY (SupplierId) REFERENCES SupplierProfiles(SupplierId),
    CONSTRAINT UQ_SupplierOrderConf           UNIQUE (OrderId, SupplierId)
);

CREATE INDEX IX_SupplierOrderConf_Order    ON SupplierOrderConfirmations(OrderId);
CREATE INDEX IX_SupplierOrderConf_Supplier ON SupplierOrderConfirmations(SupplierId);
CREATE INDEX IX_SupplierOrderConf_Status   ON SupplierOrderConfirmations(Status);


-- ============================================================
--  5. SHIPPER NHẬN / TỪ CHỐI ĐƠN – UC27, UC28
--     Ghi lại mọi hành động accept/reject của từng Shipper
-- ============================================================

CREATE TABLE ShipperOrderActions (
    ActionId    INT             PRIMARY KEY IDENTITY(1,1),
    DeliveryId  INT             NOT NULL,
    ShipperId   INT             NOT NULL,
    Action      VARCHAR(20)     NOT NULL,   -- Accepted | Rejected
    Reason      NVARCHAR(500)   NULL,       -- Lý do từ chối
    CreatedAt   DATETIME2       NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_ShipperOrderActions_Deliveries FOREIGN KEY (DeliveryId) REFERENCES Deliveries(DeliveryId),
    CONSTRAINT FK_ShipperOrderActions_Shippers   FOREIGN KEY (ShipperId)  REFERENCES ShipperProfiles(ShipperId)
);

CREATE INDEX IX_ShipperOrderActions_Delivery ON ShipperOrderActions(DeliveryId);
CREATE INDEX IX_ShipperOrderActions_Shipper  ON ShipperOrderActions(ShipperId);


-- ============================================================
--  6. LỊCH SỬ GIAO HÀNG – UC29, UC30
--     Lưu từng lần cập nhật trạng thái + ảnh xác nhận
-- ============================================================

CREATE TABLE DeliveryStatusHistories (
    HistoryId   INT             PRIMARY KEY IDENTITY(1,1),
    DeliveryId  INT             NOT NULL,
    Status      VARCHAR(30)     NOT NULL,
    -- WaitingForShipper | Assigned | PickedUp | Delivering | Delivered | Failed
    Note        NVARCHAR(500)   NULL,
    ImageUrl    NVARCHAR(500)   NULL,   -- UC30: ảnh xác nhận giao hàng thành công
    CreatedAt   DATETIME2       NOT NULL DEFAULT GETUTCDATE(),
    UpdatedBy   INT             NULL,   -- ShipperId hoặc System
    CONSTRAINT FK_DeliveryStatusHistories_Deliveries FOREIGN KEY (DeliveryId) REFERENCES Deliveries(DeliveryId),
    CONSTRAINT FK_DeliveryStatusHistories_Users      FOREIGN KEY (UpdatedBy)  REFERENCES Users(UserId)
);

CREATE INDEX IX_DeliveryStatusHistories_Delivery ON DeliveryStatusHistories(DeliveryId);
