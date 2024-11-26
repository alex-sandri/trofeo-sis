from django.db import models


class Sport(models.Model):
    nome = models.TextField()

    class Meta:
        verbose_name_plural = 'Sport'

    def __str__(self) -> str:
        return self.nome
