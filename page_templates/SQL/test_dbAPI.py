#!/usr/bin/python3

import sqlite3
import dbAPI

dbAPI.create('test_db')

dbAPI.print_tables('test_db')