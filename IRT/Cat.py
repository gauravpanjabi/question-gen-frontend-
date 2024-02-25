import numpy as np

class AdaptiveAlgorithm:
    def __init__(self, item_bank):
        self.item_bank = item_bank
        self.ability_level = 0  # Initialize ability level
        self.responses = []     # Store examinee responses
        self.used_indices = []  # Keep track of used question indices

    def select_question(self):
        # If the first question has not been asked yet, return it
        if not self.responses:
            self.used_indices.append(0)
            return self.item_bank[0]

        # Calculate item parameters (difficulty and discrimination) for each question in the item bank
        item_params = self.calculate_item_parameters()

        # Calculate item difficulty adjusted for examinee ability level
        adjusted_difficulty = item_params[:, 0] - self.ability_level

        # Calculate item probabilities using the Rasch model
        item_probabilities = 1 / (1 + np.exp(-item_params[:, 1] * adjusted_difficulty))

        # Exclude questions that have already been used
        for idx in self.used_indices:
            item_probabilities[idx] = 0

        # Select the next question based on maximum information criteria
        next_question_index = np.argmax(item_probabilities)

        # Add the index of the selected question to used_indices
        self.used_indices.append(next_question_index)

        # Return the selected question from the item bank
        return self.item_bank[next_question_index]

    def update_ability_level(self, response):
        # Update examinee's ability level based on the response to the current question
        # For simplicity, let's assume correct response adds 1 to ability level, incorrect subtracts 1
        if response == "correct":
            self.ability_level += 1
        elif response == "incorrect":
            self.ability_level -= 1

        # Store the response for future analysis
        self.responses.append(response)

    def calculate_item_parameters(self):
        # For simplicity, let's assume item parameters (difficulty and discrimination) are pre-calculated
        item_params = np.array([
            [0.2, 0.8],    # Example item parameters for question 1
            [0.5, 0.7],    # Example item parameters for question 2
            [0.3, 1.1],   # Example item parameters for question 3
            [0.4, 0.9],    # Example item parameters for question 4
            [1.5, 0.6],    # Example item parameters for question 5
            [1.2, 1.2],    # Example item parameters for question 6
            [0.8, 1.0],   # Example item parameters for question 7
            [0.6, 0.8],    # Example item parameters for question 8
            [0.5, 1.3],   # Example item parameters for question 9
            [1.0, 0.7],    # Example item parameters for question 10
            [1.3, 1.2],    # Example item parameters for question 11
            [0.8, 0.9],   # Example item parameters for question 12
            [0.8, 0.8],    # Example item parameters for question 13
            [1.8, 1.1],     # Example item parameters for question 14
            [0.8, 1.1]     # Example item parameters for question 15
        ])
        return item_params

# Example usage
questions = [
    "What is the purpose of an operating system?",
    "Explain the difference between a process and a thread.",
    "How does virtual memory work in modern operating systems?",
    "Describe the role of the kernel in an operating system.",
    "What are the various types of scheduling algorithms used in operating systems, and how do they differ?",
    "How does a deadlock occur in an operating system, and what are some techniques to prevent it?",
    "Explain the difference between a monolithic kernel and a microkernel.",
    "What is the purpose of device drivers in an operating system?",
    "Describe the boot process of a typical operating system.",
    "How does an operating system manage file systems and disk storage?",
    "What are the different types of file systems commonly used in operating systems, and how do they differ?",
    "Explain the concept of process synchronization and why it's important in operating systems.",
    "Discuss the role of interrupt handling in an operating system.",
    "What is the difference between multiprogramming, multiprocessing, and multitasking?",
    "How does an operating system handle memory management, including techniques like paging and segmentation?"
]

adaptive_algorithm = AdaptiveAlgorithm(questions)

# Simulate examinee responses (e.g., "correct" or "incorrect") for each question
responses = ["correct", "correct", "correct", "incorrect", "correct", 
             "incorrect", "incorrect", "correct", "incorrect", "correct",
             "correct", "incorrect", "correct", "incorrect", "correct"]

# Select and present questions adaptively based on responses
for response in responses:
    next_question = adaptive_algorithm.select_question()
    print("Next question:", next_question)
    adaptive_algorithm.update_ability_level(response)
