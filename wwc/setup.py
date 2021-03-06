import os
import sys

from setuptools import setup
from setuptools import find_packages

from setuptools.command.test import test as TestCommand


class PyTest(TestCommand):
    def finalize_options(self):
        TestCommand.finalize_options(self)
        self.test_args = []
        self.test_suite = True

    def run_tests(self):
        #import here, cause outside the eggs aren't loaded
        import pytest
        errno = pytest.main(self.test_args)
        sys.exit(errno)

here = os.path.abspath(os.path.dirname(__file__))
with open(os.path.join(here, 'README.txt')) as f:
    README = f.read()
with open(os.path.join(here, 'CHANGES.txt')) as f:
    CHANGES = f.read()

requires = [
    'pyramid',
    'pyramid_debugtoolbar',
    'pyramid_tm',
    'pyramid_mako',
    'pyramid_mailer',
    'pyramid_redis_sessions',
    'horus',
    'velruse',
    'deform',
    'SQLAlchemy',
    'psycopg2',
    'transaction',
    'zope.sqlalchemy',
    'waitress',
    'uwsgi',
    'cent',
    'centrifuge',
    'setuptools',
]

entry_points = """\
[paste.app_factory]
main = wwc:main

[console_scripts]
initialize_wwc_db = wwc.scripts.initializedb:main
delete_wwc_db = wwc.scripts.deletedb:main
initialize_cent_config = wwc.scripts.initialize_cent_config:main
initialize_cent_projects = wwc.scripts.initialize_cent_projects:main
"""

setup(
    name='wwc',
    version='0.0',
    description='Web-wide chat',
    long_description=README + '\n\n' + CHANGES,
    classifiers=[
        "Programming Language :: Python",
        "Framework :: Pyramid",
        "Topic :: Internet :: WWW/HTTP",
        "Topic :: Internet :: WWW/HTTP :: WSGI :: Application",
    ],
    author='Dave O',
    author_email='davidobrite@gmail.com',
    url='',
    keywords='web wsgi pyramid centrifuge',
    include_package_data=True,
    zip_safe=False,
    test_suite='wwc',
    install_requires=requires,
    cmdclass={'test': PyTest},
    entry_points=entry_points
)
