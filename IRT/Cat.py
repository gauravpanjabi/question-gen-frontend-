import numpy as np
import random

def create_adaptive_algorithm(item_bank):
    ability_level = [1]
    responses = []
    used_indices = []

    def select_question():
        if not responses:
            starting_idx = random.randint(0, len(item_bank) - 1)
            used_indices.append(starting_idx)
            return item_bank[starting_idx]

        item_params = calculate_item_parameters()
        adjusted_difficulty = ability_level[0] - item_params[:, 0]
        item_probabilities = 1 / (1 + np.exp(-adjusted_difficulty))

        remaining_indices = [i for i in range(len(item_bank)) if i not in used_indices]

        if responses[-1] == "correct":
            # Filter out indices with item probability less than or equal to the previous item's probability
            remaining_indices = [i for i in remaining_indices if item_probabilities[i] <= item_probabilities[used_indices[-1]]]
            if remaining_indices:
                next_question_index = max(remaining_indices, key=lambda x: item_probabilities[x])
            else:
                next_question_index = max(range(len(item_probabilities)), key=lambda x: item_probabilities[x])
        else:
            # Filter out indices with item probability greater than or equal to the previous item's probability
            remaining_indices = [i for i in remaining_indices if item_probabilities[i] >= item_probabilities[used_indices[-1]]]
            if remaining_indices:
                next_question_index = min(remaining_indices, key=lambda x: item_probabilities[x])
            else:
                next_question_index = min(range(len(item_probabilities)), key=lambda x: item_probabilities[x])

        used_indices.append(next_question_index)
        return item_bank[next_question_index]

    def update_ability_level(response):
        if response == "correct":
            ability_level[0] += 1
        elif response == "incorrect":
            ability_level[0] -= 1

        responses.append(response)

    def calculate_item_parameters():
        item_params = np.array([
            [0.7], [0.5], [0.3], [0.4], [1.5],
            [1.2], [0.2], [0.6], [0.5], [1.0],
            [1.3], [0.8], [0.8], [1.8], [0.8]
        ])
        return item_params

    return select_question, update_ability_level

# Example usage
questions = [
    "Explain the difference between a monolithic kernel and a microkernel. [0.7]", #1
    "Explain the difference between a process and a thread [0.5].", #2
    "How does virtual memory work in modern operating systems? [0.3]", #3
    "Describe the role of the kernel in an operating system. [0.4] ", #4
    "What are the various types of scheduling algorithms used in operating systems, and how do they differ? [1.5]", #5
    "How does a deadlock occur in an operating system, and what are some techniques to prevent it [1.2]?", #6
    "What is the purpose of an operating system [0.2]?", #7
    "What is the purpose of device drivers in an operating system? [0.6]", #8
    "Describe the boot process of a typical operating system. [0.5]", #9
    "How does an operating system manage file systems and disk storage? [1.0]", #10
    "What are the different types of file systems commonly used in operating systems, and how do they differ? [1.3]", #11
    "Explain the concept of process synchronization and why it's important in operating systems. [0.8]", #12
    "Discuss the role of interrupt handling in an operating system. [0.8]", #13
    "What is the difference between multiprogramming, multiprocessing, and multitasking? [1.8]", #14
    "How does an operating system handle memory management, including techniques like paging and segmentation? [0.9]" #15
]

select_question, update_ability_level = create_adaptive_algorithm(questions)

print("Q] ", select_question())
response = int(input())
val = "correct" if response == 1 else "incorrect"
update_ability_level(val)

for i in range(len(questions)-1):
    print("Q] ", select_question())
    response = int(input())
    val = "correct" if response == 1 else "incorrect"
    update_ability_level(val)