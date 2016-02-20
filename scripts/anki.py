import os
import sys

"""
Find all ocurrences of an ANKI crad in an input text file and write
ocurrences in an output file
"""

ANKI_COLUMN_DELIMITER = ";"

infile = open(sys.argv[1], "rb")
lines = infile.readlines()
infile.close()

translations = []

outfile = open(sys.argv[2], "wb")
for line in lines:
    if line.find(ANKI_COLUMN_DELIMITER) != -1:
        outfile.write("%s%s" % (line, os.linesep))
outfile.close()
