source /root/miniconda3/etc/profile.d/conda.sh
conda activate ssvep_server
alias proj="cd /root/SSVEP-web/ssvep_server"
proj
gunicorn -b 127.0.0.1:5001 ssvep_server:app
