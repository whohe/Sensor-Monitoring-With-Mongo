FROM python:3.7
LABEL maintainer="who <wilsonhernandezortiz@gmail.com>"
RUN pip3 install --upgrade pip
RUN pip3 install numpy matplotlib tensorflow scikit-learn pymongo pytz --break-system-packages
WORKDIR /root/
COPY machine-learning-model/entrypoint.sh /entrypoint.sh
RUN chmod 775 /entrypoint.sh
ENTRYPOINT /entrypoint.sh
