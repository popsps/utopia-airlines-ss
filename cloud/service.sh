#!/bin/sh

# mysql -h host_name -P 3306 -u db_master_user -p
# source db.sql
mysql -h host_name -P 3306 -u "utopia" -p "utopiacoolpassword" mydb < db.baby.sql