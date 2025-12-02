def greet_user(name):
    """
    This function takes a name as input and returns a greeting message.
    """
    greeting = f"Hello, {name}! Welcome to the L100 Git repository."
    return greeting

# Main part of the script
if __name__ == "__main__":
    user_name = "Developer"
    message = greet_user(user_name)
    
    # Print the greeting message to the console
    print(message)

    # Example of simple addition
    num1 = 10
    num2 = 20
    total = num1 + num2
    print(f"The sum of {num1} and {num2} is: {total}")