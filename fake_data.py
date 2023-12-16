from faker import Faker
import pandas as pd

fake = Faker('vi_VN')  # Sử dụng ngôn ngữ tiếng Việt

# Tạo dữ liệu giả mạo cho bảng aggregation_points
num_points = 50  # Số lượng điểm tập kết

data = {
    'email': [fake.email() for _ in range(num_points)],
    # 'phone': [fake.phone_number() for _ in range(num_points)]
}

# Chuyển dữ liệu thành DataFrame
df_aggregation_points = pd.DataFrame(data)

# Lọc ra các dòng có email kết thúc bằng ".org"
filtered_df = df_aggregation_points[df_aggregation_points['email'].str.endswith('.org')]

# In ra 5 dòng đầu tiên của DataFrame sau khi lọc
print(filtered_df.head())
def generate_phone_number(n):
    for _ in range(n):
        print(f"+84 {fake.random_number(digits=3)} {fake.random_number(digits=3)} {fake.random_number(digits=4)}")

# Example usage
# phone_number = generate_phone_number(10)
# print(phone_number)