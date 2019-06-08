import psycopg2
import os


def get_database_connection():
    conn = psycopg2.connect(os.environ['HEART_DATABASE_URL'] + '?ssl=true')
    return conn


def load_csv_file(path, table):
    conn = get_database_connection()
    cur = conn.cursor()
    with open(path, 'r') as f:
        # Notice that we don't need the `csv` module.
        next(f)  # Skip the header row.
        cur.copy_from(f, table, sep=',')
    conn.commit()
