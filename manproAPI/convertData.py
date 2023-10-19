import csv

# define the input and output filenames
input_file = 'C:/Users/USER/OneDrive/Desktop/prog/Project/PFE/manproAPI/jobs.csv'
output_file = 'C:/Users/USER/OneDrive/Desktop/prog/Project/PFE/manproAPI/jobs_with_skills.csv'

# read in the input file and extract the relevant data
with open(input_file, newline='') as f:
    reader = csv.reader(f)
    next(reader)  # skip header row
    data = []
    for row in reader:
        job_id = row[0]
        skills = row[2].split(', ')
        for skill in skills:
            data.append([None, job_id, skill.strip()])

# add an auto-incrementing ID for each row
for i, row in enumerate(data):
    row[0] = i + 1

# write the output file
with open(output_file, 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['id', 'job_id', 'skill'])
    writer.writerows(data)