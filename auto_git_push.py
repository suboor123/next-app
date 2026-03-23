import os
import time
from datetime import datetime

def git_push():
    # Add files
    os.system("git add .")

    # Commit with timestamp
    commit_message = f"Auto commit {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
    os.system(f'git commit -m "{commit_message}"')

    # Push
    os.system("git push")

    print("Committed and pushed:", commit_message)

while True:
    git_push()

    # Wait 1 hour
    time.sleep(10)
    