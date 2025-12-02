def greet_user(name):
    
    
    greeting = f"Hello, {name}! Welcome to the L100 Git repository."
    return greeting


if __name__ == "__main__":
    user_name = "Developer"
    message = greet_user(user_name)
    
    
    print(message)

    
    num1 = 60
    num2 = 20
    total = num1 + num2
    print(f"The sum of {num1} and {num2} is: {total}")
