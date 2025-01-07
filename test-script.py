import requests

# Define the API endpoint
API_URL = "http://localhost:5000/api/login"  # Update with your API endpoint

# Test cases for login
test_cases = [
    {"username": "validUser", "password": "validPass", "expected_status": 200, "description": "Valid credentials"},
    {"username": "invalidUser", "password": "invalidPass", "expected_status": 401, "description": "Invalid credentials"},
    {"username": "", "password": "somePass", "expected_status": 400, "description": "Missing username"},
    {"username": "validUser", "password": "", "expected_status": 400, "description": "Missing password"},
]

def test_login_api():
    print("Starting Login API Tests...\n")
    for test in test_cases:
        print(f"Test Case: {test['description']}")
        response = requests.post(API_URL, json={
            "username": test["username"],
            "password": test["password"]
        })
        
        # Print response for debugging
        print(f"Status Code: {response.status_code}")
        print(f"Response Body: {response.json()}\n")
        
        # Validate the response
        if response.status_code == test["expected_status"]:
            print("✅ Test Passed\n")
        else:
            print("❌ Test Failed\n")
        print("-" * 40)

if __name__ == "__main__":
    test_login_api()
