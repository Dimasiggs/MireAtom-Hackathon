FROM python:3.12


COPY ./requirements.txt /code/requirements.txt


RUN pip install --upgrade -r /code/requirements.txt


WORKDIR /code


COPY . /code/app


CMD ["fastapi", "run", "app/main.py", "--port", "80"]